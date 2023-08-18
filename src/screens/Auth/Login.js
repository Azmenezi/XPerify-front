import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { login } from "../../apis/auth";
import UserContext from "../../context/UserContext";
import jwt_decode from "jwt-decode";
import { storeToken } from "../../apis/auth/storage";

// Define validation schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .required("Username is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/\d/, "Password must contain a number.")
    .matches(/[A-Z]/, "Password must contain an uppercase letter.")
    .matches(/[a-z]/, "Password must contain a lowercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol.")
    .required("Password is required."),
});

const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [backendError, setBackendError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme(); // Get the currently active theme

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    mutate: loginFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (userInfo) =>
      login({ ...userInfo, username: userInfo.username.toLowerCase() }),
    onSuccess: (data) => {
      const decodeUser = jwt_decode(data.token);
      setUser(decodeUser);
      storeToken(data.token);
    },
    onError: (err) => {
      // console.log("err", err);
      setBackendError(err.response.data.message); // Assuming error response is in this format
    },
  });

  const handleRegister = () => {
    navigation.navigate("RegisterUsername");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          loginFunction(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          // Move handleChangeAndResetError inside this function
          const handleChangeAndResetError = (field) => (text) => {
            setBackendError(null);
            handleChange(field)(text);
          };

          return (
            <View>
              <View style={{ width: "80%", marginTop: 40, marginBottom: 4 }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 18,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}
                >
                  Login
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    opacity: 0.75,
                    textAlign: "center",
                    marginBottom: 2,
                  }}
                >
                  Enter your username and password to login.
                </Text>
              </View>
              <TextInput
                style={{
                  height: 48,
                  marginBottom: 4,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 15,
                  backgroundColor: theme.colors.whiteText,
                  color: theme.colors.text,
                }}
                placeholder="Username"
                onBlur={handleBlur("username")}
                onChangeText={handleChangeAndResetError("username")}
                value={values.username}
                placeholderTextColor={theme.colors.primary}
              />
              {errors.username && touched.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
              <View className="relative">
                <TextInput
                  style={{
                    backgroundColor: theme.colors.inputBackground,
                    color: theme.colors.text,
                    height: 48,
                    marginBottom: 4,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 15,
                    backgroundColor: theme.colors.whiteText,
                    color: theme.colors.text,
                  }}
                  placeholder="Password"
                  onBlur={handleBlur("password")}
                  onChangeText={handleChangeAndResetError("password")}
                  value={values.password}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={theme.colors.primary}
                />
                <Pressable
                  style={{
                    position: "absolute",
                    padding: 2,
                    top: 20,
                    right: 10,
                  }}
                  className="absolute p-2 top-4 right-2"
                  onPress={() => {
                    toggleShowPassword();
                  }}
                >
                  <FontAwesome
                    name={showPassword ? "eye" : "eye-slash"}
                    size={24}
                    color={theme.colors.text}
                    style={{ marginTop: -12, opacity: 0.6 }}
                  />
                </Pressable>
              </View>
              {backendError && (
                <Text style={{ color: "red" }}>{backendError}</Text>
              )}
              {errors.password && touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <View className="mt-2">
                <Button title="Login" onPress={handleSubmit} />
              </View>
              <TouchableHighlight
                onPress={handleRegister}
                underlayColor="#00000010"
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Text
                    style={{ color: theme.colors.text, textAlign: "center" }}
                  >
                    Don't have an account?
                  </Text>

                  <Text style={{ color: "blue", fontWeight: "600" }}>
                    Register
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
