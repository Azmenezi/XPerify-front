import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

import ImageHandler from "../../../components/ImagePickerHandler";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../../../context/UserContext";
import { storeToken } from "../../../apis/auth/storage";
import { useTheme } from "@react-navigation/native";
import { register } from "../../../apis/auth";
import jwt_decode from "jwt-decode";

const RegisterImage = ({ route, navigation }) => {
  const { username, password } = route.params;
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const { setUser } = useContext(UserContext);

  const theme = useTheme(); // Get the currently active theme

  const {
    mutate: registerFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => {
      return register({ ...userInfo, image });
    },
    onSuccess: (data) => {
      const decodeUser = jwt_decode(data.token);
      setUser(decodeUser);
      storeToken(data.token);
    },
    onError: (err) => {
      console.log("========>", err);
    },
  });

  useEffect(() => {
    setUserInfo({ ...userInfo, username, password });
  }, []);

  const handleRegister = () => {
    // Perform registration logic here, such as calling an API
    // setUserInfo({ ...userInfo, image });
    registerFunction();
  };

  return (
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
          Pick an image
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Pick an image for your new account. You can always change it later.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageHandler image={image} setImage={setImage} />
        <View style={{ marginTop: 8 }}>
          <Button title="Register" onPress={handleRegister} />
        </View>
      </View>
    </View>
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
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: "-15%", // You may need to adjust this value depending on the device
  },
});

export default RegisterImage;
