import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../apis/chat";
import ROUTES from "../../navigation";
import UserContext from "../../context/UserContext";
import { ActivityIndicator } from "react-native-paper";

const DM = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["myChats"],
    queryFn: () => getMyChats(),
  });

  if (isLoading) return <ActivityIndicator color="black"></ActivityIndicator>;
  return (
    <View>
      {data?.map((chat) => {
        return (
          <Pressable
            key={chat._id}
            onPress={() => {
              navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT, {
                chatId: chat._id,
              });
            }}
            style={{
              height: 100,
              borderWidth: 2,
              borderColor: "balck",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>
              {chat?.members?.find((member) => member._id !== user._id) &&
                chat?.members?.find((member) => member._id !== user._id)
                  .username}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DM;

const styles = StyleSheet.create({});
