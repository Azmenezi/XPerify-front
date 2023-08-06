import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function MessageBubble({ msg }) {
  return (
    <View
      style={{
        margin: 3,
        marginHorizontal: 10,
        backgroundColor: "#F3EDDE",
        maxWidth: "70%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 2,
        marginLeft: "auto",
      }}
    >
      <View style={{ padding: 12 }}>
        <Text style={{ color: "black" }} key={msg._id}>
          {msg.text}
        </Text>
      </View>
    </View>
  );
}
