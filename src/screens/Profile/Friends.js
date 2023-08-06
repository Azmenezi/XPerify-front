import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../apis/auth";
import { getChatUser } from "../../apis/chat";
import ROUTES from "../../navigation";
import { AntDesign } from "@expo/vector-icons";
import { BASE_URL } from "../../apis";
import { useTheme } from "@react-navigation/native";

const Friends = ({ navigation }) => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const theme = useTheme(); // Get the currently active theme
  const { mutate: getChatUserFn } = useMutation({
    mutationFn: (userId) => getChatUser(userId),
    onSuccess: (data) => {
      navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT, {
        chatId: data._id,
      });
    },
  });
  return (
    <ScrollView>
      {users?.map((user) => {
        return (
          <Pressable
            style={{
              height: 100,
              borderWidth: 0.2,
              borderColor: "balck",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              getChatUserFn(user._id);
            }}
          >
            <View
              style={{
                marginRight: "auto",
                flexDirection: "row",
                gap: 20,
                marginLeft: 20,
              }}
            >
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                source={{
                  uri: `${BASE_URL}/${user.image}`,
                }}
              />

              <Text style={{ color: theme.colors.text, fontSize: 20, top: 14 }}>
                {user.username}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default Friends;

const styles = StyleSheet.create({});
