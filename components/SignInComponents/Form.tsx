import { StyleSheet, View } from "react-native";
import React from "react";
import CustomInput from "../common/CustomInput";
import { Formik } from "formik";
import * as yup from "yup";
import PrimaryButton from "../common/PrimaryButton";
import { SignIn } from "../../api/SignIn";
import { useAuth } from "../../contexts/auth";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

const Form = () => {
  const [loading, setLoading] = React.useState(false);
  const { signIn } = useAuth();
  const styles = StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values);
          setLoading(true);
          await SignIn(values.email, values.password);
          signIn();
          setLoading(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <CustomInput
              handleBlur={handleBlur("email")}
              handleChange={handleChange("email")}
              value={values.email}
              placeholder="Email"
              type="email"
              title="Your Email"
            />
            <CustomInput
              handleBlur={handleBlur("password")}
              handleChange={handleChange("password")}
              value={values.password}
              placeholder="Password"
              type="password"
              title="Your Password"
            />
            <View style={{ height: 20 }} />
            <PrimaryButton
              loading={loading}
              title="Sign In"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default Form;
