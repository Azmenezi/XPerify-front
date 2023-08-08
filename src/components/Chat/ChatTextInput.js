import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";

export default function ChatTextInput({ msgInfo, setMsgInfo, sendMsgFn }) {
  const [textAlign, setTextAlign] = useState((prev) => prev);
  const handleSendMessage = () => {
    const messageToSend = msgInfo;
    if (messageToSend.length > 0) {
      sendMsgFn(messageToSend);
      setMsgInfo("");
    }
  };
  const handleChangeText = (value) => {
    setMsgInfo(value);

    // Simple logic to detect if the text is Arabic, you might want to enhance this
    if (msgInfo.length < 2 && /[\u0600-\u06FF]/.test(value)) {
      setTextAlign("right");
    } else if (msgInfo.length < 2) {
      setTextAlign("left");
    }
  };
  return (
    <>
      <TextInput
        multiline
        value={msgInfo}
        placeholder="message.."
        placeholderTextColor={"#ffffff70"}
        style={{
          padding: 10,
          width: "78%",
          marginBottom: 20,
          marginTop: 10,
          backgroundColor: "#1c1c1c",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 10,
          minHeight: 25,
          maxHeight: 125,
          justifyContent: "center",
          textAlign: textAlign, // Apply the text alignment
          marginHorizontal: 2,
          color: "white",
        }}
        onChangeText={handleChangeText}
      />
      <Button
        style={{
          marginBottom: 5,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          marginHorizontal: 2,
        }}
        onPress={handleSendMessage}
      >
        <Text
          style={{
            color: "black",
          }}
        >
          Send
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({});
