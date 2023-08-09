import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlaceChat, sendPublicChat } from "../../apis/chat";
import UserContext from "../../context/UserContext";
import { socket } from "../../socket";
import ChatBox from "./ChatBox";
import ChatTextInput from "./ChatTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function PublicChatComponent({ navigation, _id }) {
  const chatId = _id;
  const { user } = useContext(UserContext);
  const [msgInfo, setMsgInfo] = useState("");
  const theme = useTheme();
  const { data: data, refetch } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getPlaceChat(chatId),
  });
  const queryClient = useQueryClient();

  const { mutate: sendMsgFn } = useMutation({
    mutationFn: (message) => sendPublicChat(chatId, message),
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
      socket.emit("publicChatSend", {
        chatId: chatId,
        from: user._id,
        message: msgInfo,
      });
    },
  });

  const scrollViewRef = useRef();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    navigation.setOptions({
      title:
        data?.members?.find((member) => member._id !== user._id) &&
        data?.members?.find((member) => member._id !== user._id).username,
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  useEffect(() => {
    socket.connect();
    socket.emit("joinPublicChat", chatId);
    socket.on("publicChatReceive", (data) => {
      if (data.chatId === chatId && data.from !== user._id) {
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 145 : 122}
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
