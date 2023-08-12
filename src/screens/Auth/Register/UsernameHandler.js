import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { checkUsername } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .matches(
      /^[a-zA-Z0-9._]*$/,
      "can only contain letters numbers and underscores"
    )
    .required("Username is required."),
});

const RegisterUsername = ({ navigation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [username, setUsername] = useState();

  const theme = useTheme();

  const { mutate: userNamechecker } = useMutation({
    mutationFn: checkUsername,
    onSuccess: (data) => {
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
      if (data.message.includes("available")) {
        navigation.navigate("RegisterPassword", {
          username: username.toLowerCase(),
        });
      }
    },
    onError: (err) => {
      // console.log("err", err);
    },
  });

  return (
    <Formik
      initialValues={{ username: "" }}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        userNamechecker(values.username.toLowerCase());
        setUsername(values.username.toLowerCase());
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ marginTop: 96, marginBottom: 16, width: "80%" }}>
            <Text
              style={{
                color: theme.colors.text,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
              }}
            >
              Pick Username
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Choose a username for your new account. You can always change it
              later.
            </Text>
          </View>
          <TextInput
            style={{
              width: "80%",
              height: 48,
              marginBottom: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 15,
              backgroundColor: "#1c1c1c",
              color: "white",
            }}
            placeholder="Username"
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
            value={values.username}
            placeholderTextColor={theme.colors.inputPlaceholder}
          />
          {errors.username && touched.username && (
            <Text style={{ color: "red" }}>{errors.username}</Text>
          )}
          {suggestions.length > 0 && (
            <View style={{ width: "70%" }}>
              <Text style={{ color: "#ff0000", marginBottom: 8 }}>
                username is taken, some suggestions:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <TouchableHighlight
                    style={{
                      margin: 2,
                      backgroundColor: "#1c1c1c",
                      height: 32,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                    }}
                    onPress={() => {
                      setFieldValue("username", suggestion);
                      setUsername(suggestion);
                    }}
                    key={index}
                  >
                    <Text style={{ color: theme.colors.text }}>
                      {suggestion}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          )}
          <View style={{ marginTop: 8 }}>
            <Button title="Next" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterUsername;
