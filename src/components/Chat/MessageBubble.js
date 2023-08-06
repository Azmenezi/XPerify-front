import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MessageBubble({ msg }) {
  return (
    <View
      style={{
        margin: 3,
        backgroundColor: "blue",
        maxWidth: "70%",
        borderRadius: "10%",
        marginLeft: "auto",
      }}
    >
      <View style={{ padding: 12 }}>
        <Text style={{ color: "white" }} key={msg._id}>
          {msg.text}
        </Text>
      </View>
    </View>
  );
}
