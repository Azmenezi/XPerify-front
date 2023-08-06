import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function RecievedMsgBubble({ msg }) {
  return (
    <View
      style={{
        margin: 3,
        backgroundColor: "white",
        maxWidth: "70%",
        borderRadius: "10%",
        marginRight: "auto",
      }}
    >
      <View style={{ padding: 12 }}>
        <View>
          <Image />
        </View>
        <Text key={msg._id}>{msg.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
