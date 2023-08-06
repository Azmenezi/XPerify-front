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
        style={{
          padding: 10,
          width: "78%",
          marginBottom: 20,
          marginTop: 10,
          backgroundColor: "white",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 10,
          minHeight: 50,
          justifyContent: "center",
          textAlign: textAlign, // Apply the text alignment
          marginHorizontal: 2,
        }}
        onChangeText={handleChangeText}
      />
      <Button
        style={{
          marginBottom: 5,
          backgroundColor: "#000000",
          borderRadius: 10,
          marginHorizontal: 2,
        }}
        onPress={handleSendMessage}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Send
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({});
