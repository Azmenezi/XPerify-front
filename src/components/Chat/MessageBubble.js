import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { useTheme } from "@react-navigation/native";

export default function MessageBubble({ msg }) {
  const theme = useTheme(); // Get the currently active theme
  return (
    <View
      style={{
        margin: 3,
        marginHorizontal: 10,
        backgroundColor: theme.colors.primary,
        maxWidth: "70%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 2,
        marginLeft: "auto",
      }}
    >
      <View style={{ padding: 12 }}>
        <Text style={{ color: theme.colors.text }} key={msg._id}>
          {msg.text}
        </Text>
        <Text style={{ color: "#ffffff60", marginTop: 5 }}>
          {moment(msg.createdAt).format("LT")}
        </Text>
      </View>
    </View>
  );
}
