import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth";
import UserContext from "../../context/UserContext";
import jwt_decode from "jwt-decode";
import ROUTES from "../../navigation";
import { storeToken } from "../../apis/auth/storage";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);

  const { mutate: loginFn } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      const decodeUser = jwt_decode(data.token);
      setUser(decodeUser);
      storeToken(data.token);
    },
  });

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => setUserInfo({ ...userInfo, username: value })}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setUserInfo({ ...userInfo, password: value })}
      />
      <Button onPress={loginFn}>Login</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
