import { useRouter, useSegments } from "expo-router";
import React from "react";

type AuthContext = {
  signIn: () => void;
  signOut: () => void;
  user: any;
};

const AuthContext = React.createContext<AuthContext>({
  signIn() {},
  signOut() {},
  user: null,
});
// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: boolean) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function Provider(props: { children: React.ReactNode }) {
  const [user, setAuth] = React.useState(false);
  console.log("🚀 ~ file: auth.tsx:44 ~ Provider ~ user:", user);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {}, []);

  useProtectedRoute(user);

  function onAuthStateChanged(user: any) {
    setAuth(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => setAuth(true),
        signOut: () => setAuth(false),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
