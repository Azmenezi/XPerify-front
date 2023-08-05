import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../apis/chat";
import ROUTES from "../../navigation";

const DM = ({ navigation }) => {
  const { data } = useQuery({
    queryKey: ["myChats"],
    queryFn: () => getMyChats(),
  });
  //   console.log(data);
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
              {chat.members.map((member) => member.username).join(" - ")}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default DM;

const styles = StyleSheet.create({});
