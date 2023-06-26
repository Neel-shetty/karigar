import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { Text, useThemeColor } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Header from "../../components/SignInComponents/Header";
import Info from "../../components/SignInComponents/Info";
import Form from "../../components/SignInComponents/Form";
import { useAuth } from "../../contexts/auth";

const signIn = () => {
  const { signIn } = useAuth();
  const textColor = useThemeColor(
    { dark: Colors.dark.text, light: Colors.light.text },
    "text"
  );
  console.log("🚀 ~ file: sign-in.tsx:7 ~ signIn ~ signIn:", signIn);
  const backgroundColor = useThemeColor(
    { dark: Colors.dark.background, light: Colors.light.background },
    "background"
  );
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <Header />
      <View style={styles.spacer} />
      <Info />
      <View style={styles.spacer} />
      <Form />
    </View>
  );
};

export default signIn;

const styles = StyleSheet.create({
  spacer: {
    height: 20,
  },
});
