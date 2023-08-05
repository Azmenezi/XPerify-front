import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../apis/auth";
import { getChatUser } from "../../apis/chat";
import ROUTES from "../../navigation";

const Friends = ({ navigation }) => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const { mutate: getChatUserFn } = useMutation({
    mutationFn: (userId) => getChatUser(userId),
    onSuccess: (data) => {
      navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT, {
        chatId: data._id,
      });
    },
  });
  return (
    <View>
      {users?.map((user) => {
        return (
          <Pressable
            style={{
              height: 100,
              borderWidth: 2,
              borderColor: "balck",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              getChatUserFn(user._id);
            }}
          >
            <Text>{user.username}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({});
