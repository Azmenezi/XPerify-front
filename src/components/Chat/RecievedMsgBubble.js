import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import moment from "moment";
import ROUTES from "../../navigation/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

export default function RecievedMsgBubble({ msg }) {
  const routeName = useRoute().name;
  const theme = useTheme(); // Get the currently active theme
  const navigation = useNavigation();
  return (
    <View style={{ marginRight: "auto", marginTop: 10 }}>
      <View>
        <Pressable
          style={{
            margin: 3,
            borderRadius: 50,
            marginRight: "auto",
            marginHorizontal: 10,
            height: 30,
            flexDirection: "row",
            gap: 5,
          }}
          onPress={() => {
            routeName === ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT
              ? navigation.navigate(
                  ROUTES.HEDERROUTES.PROFILE_STACK.USER_PROFILE,
                  {
                    userId: msg.from._id,
                  }
                )
              : navigation.navigate(ROUTES.HEDERROUTES.PLACE_STACK.PROFILE, {
                  userId: msg.from._id,
                });
          }}
        >
          <Image
            style={{ width: 30, height: 30, borderRadius: 50 }}
            source={{
              uri: `${BASE_URL}/${msg.from.image}`,
            }}
          />
          <Text style={{ color: "#3F4043", top: 10 }}>{msg.from.username}</Text>
        </Pressable>
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
          <Text style={{ color: theme.colors.whiteText }} key={msg._id}>
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
