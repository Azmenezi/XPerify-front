import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, TextInput } from "react-native-paper";
import { getChatMsgs, sendMsg } from "../../apis/chat";
import UserContext from "../../context/UserContext";
import { socket } from "../../socket";

const DmChat = ({ route, navigation }) => {
  const { chatId } = route.params;
  const { user } = useContext(UserContext);
  const [msgInfo, setMsgInfo] = useState("");
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChatMsgs(chatId),
  });

  const { mutate: sendMsgFn } = useMutation({
    mutationFn: () => sendMsg(chatId, msgInfo),
    onSuccess: () => {
      refetch();
      setMsgInfo("");
      socket.emit("chat", {
        from: user._id,
        to: data?.members.find((member) => member._id !== user._id)._id,
      });
    },
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    navigation.setOptions({
      headerLeft: () => {
        return (
          <Button
            onPress={() => {
              navigation.getParent()?.setOptions({
                tabBarStyle: undefined,
              });
              navigation.pop();
            }}
          >
            Back
          </Button>
        );
      },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  useEffect(() => {
    socket.connect();
    socket.on("recieve", (data) => {
      if (data.to == user._id) {
        refetch();
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text>{chatId}</Text>
        {data?.msgs.map((msg) => {
          if (msg.from == user._id) {
            return (
              <Text style={{ marginLeft: "auto" }} key={msg._id}>
                {msg.text}
              </Text>
            );
          } else {
            return <Text key={msg._id}>{msg.text}</Text>;
          }
        })}
      </ScrollView>
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <TextInput
          value={msgInfo}
          placeholder="msg"
          style={{ width: "80%" }}
          onChangeText={(value) => setMsgInfo(value)}
        />
        <Button onPress={sendMsgFn}>Send</Button>
      </View>
    </View>
  );
};

export default DmChat;

const styles = StyleSheet.create({});
