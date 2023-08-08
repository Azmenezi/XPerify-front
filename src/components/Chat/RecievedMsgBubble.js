import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import moment from "moment";

export default function RecievedMsgBubble({ msg }) {
  return (
    <View style={{ marginRight: "auto", marginTop: 10 }}>
      <View
        style={{
          margin: 3,
          borderRadius: 50,
          marginRight: "auto",
          marginHorizontal: 10,
          height: 30,
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 50 }}
          source={{
            uri: `${BASE_URL}/${msg.from.image}`,
          }}
        />
        <Text style={{ color: "white", top: 10 }}>{msg.from.username}</Text>
      </View>
      <View
        style={{
          margin: 3,
          backgroundColor: "#3F4043",
          maxWidth: "70%",
          marginRight: "auto",
          borderRadius: 15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 15,
          marginHorizontal: 10,
        }}
      >
        <View style={{ padding: 12 }}>
          <Text style={{ color: "white" }} key={msg._id}>
            {msg.text}
          </Text>
          <Text style={{ color: "#ffffff60", marginTop: 5 }}>
            {moment(msg.createdAt).format("LT")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
