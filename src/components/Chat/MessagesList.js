import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MessageBubble from "./MessageBubble";
import RecievedMsgBubble from "./RecievedMsgBubble";

export default function MessagesList({ user, data }) {
  return (
    <View style={{ flex: 1 }}>
      {data?.msgs.map((msg) => {
        if (msg.from._id == user._id) {
          return <MessageBubble msg={msg} />;
        } else {
          return <RecievedMsgBubble msg={msg} />;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
