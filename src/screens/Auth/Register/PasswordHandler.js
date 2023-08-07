import React, { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import { FontAwesome } from "@expo/vector-icons";
import * as Yup from "yup";
import { useTheme } from "@react-navigation/native";

// Define validation schema
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/\d/, "Password must contain a number.")
    .matches(/[A-Z]/, "Password must contain an uppercase letter.")
    .matches(/[a-z]/, "Password must contain a lowercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol.")
    .required("Password is required."),
});

const RegisterPassword = ({ route, navigation }) => {
  const { username } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme(); // Get the currently active theme

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{ password: "" }}
      //   validationSchema={PasswordSchema}
      onSubmit={(values) => {
        navigation.navigate("RegisterImage", {
          username,
          password: values.password,
        });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={{
                color: theme.colors.text,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
              }}
            >
              Pick a password
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              We cannot remember the password, so you need to enter it on every
              device you have even if it is on iCloud :)
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              width: "80%",
              height: 48,
              marginBottom: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 15,
            }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onBlur={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            placeholderTextColor={theme.colors.inputPlaceholder}
          />

          <Pressable style={styles.pressable} onPress={toggleShowPassword}>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color={theme.colors.text}
              style={styles.eyeIcon}
            />
          </Pressable>

          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <View style={{ marginTop: 8 }}>
            <Button title="Next" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    marginTop: 96,
    marginBottom: 16,
    width: "80%",
  },
  pressable: {
    position: "absolute",
    padding: 8,
    top: 240, // You may need to adjust this value depending on the device
    right: 48, // You may need to adjust this value depending on the device
  },
  eyeIcon: {
    marginTop: -22,
    opacity: 0.6,
  },
});

export default RegisterPassword;
