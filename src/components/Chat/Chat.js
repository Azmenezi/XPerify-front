import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatMsgs, sendMsg } from "../../apis/chat";
import UserContext from "../../context/UserContext";
import { socket } from "../../socket";
import ChatBox from "./ChatBox";
import ChatTextInput from "./ChatTextInput";
import { useTheme } from "@react-navigation/native";

export default function Chat({ route, navigation }) {
  const { chatId } = route.params;
  const { user } = useContext(UserContext);
  const [msgInfo, setMsgInfo] = useState("");
  const theme = useTheme();
  const { data: data, refetch } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChatMsgs(chatId),
  });
  const queryClient = useQueryClient();

  const { mutate: sendMsgFn } = useMutation({
    mutationFn: (message) => sendMsg(chatId, message),
    onSuccess: (newMessage) => {
      // Get the current messages
      const current = queryClient.getQueryData(["chat", chatId]);
      // Add the new message to the messages array
      const updatedMessages = {
        ...current,
        msgs: [...current.msgs, newMessage],
      };
      // Update the local state with the new messages
      queryClient.setQueryData(["chat", chatId], updatedMessages);
      scrollViewRef.current?.scrollToEnd({ animated: true });
      socket.emit("chat", {
        from: user._id,
        to: data?.members.find((member) => member._id !== user._id)._id,
      });
    },
  });

  const scrollViewRef = useRef();
  const otherMember = data?.members?.find((member) => member._id !== user._id);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    navigation.setOptions({
      title: otherMember?.username,
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
        refetch().then(() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        );
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
    >
      <ChatBox user={user} data={data} scrollViewRef={scrollViewRef} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000050",
        }}
      >
        <ChatTextInput
          msgInfo={msgInfo}
          setMsgInfo={setMsgInfo}
          sendMsgFn={sendMsgFn}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
