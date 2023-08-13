import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyChats } from "../../apis/chat";
import ROUTES from "../../navigation";
import UserContext from "../../context/UserContext";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL } from "../../apis";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const DM = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const {
    data: chatsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["myChats"],
    queryFn: () => getMyChats(),
  });
  const data = chatsData?.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const theme = useTheme(); // Get the currently active theme
  if (isLoading) return <ActivityIndicator color="black"></ActivityIndicator>;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      {data?.map((chat) => {
        return (
          <Pressable
            key={chat._id}
            onPress={() => {
              navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT, {
                chatId: chat._id,
              });
            }}
            style={{
              height: 100,
              bordercolor: theme.colors.invertedText,
              borderBottomWidth: 0.2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginRight: "auto",
                flexDirection: "row",
                gap: 15,
                marginLeft: 20,
                width: "85%",
              }}
            >
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                source={{
                  uri: `${BASE_URL}/${
                    chat?.members?.find((member) => member._id !== user._id) &&
                    chat?.members?.find((member) => member._id !== user._id)
                      .image
                  }`,
                }}
              />

              <Text style={{ color: theme.colors.text, fontSize: 20 }}>
                {chat?.members?.find((member) => member._id !== user._id) &&
                  chat?.members?.find((member) => member._id !== user._id)
                    .username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: 20,
                marginTop: 30,
                width: 220,
                overflow: "hidden",
              }}
            >
              {chat?.msgs.length > 0 && (
                <>
                  <Text
                    style={{
                      color: `${theme.colors.text}70`,
                      fontSize: 16,
                    }}
                  >
                    {chat?.msgs[0]?.from?.username}:{" "}
                  </Text>

                  <Text
                    style={{ color: `${theme.colors.text}70`, fontSize: 16 }}
                  >
                    {chat?.msgs[0]?.text}
                  </Text>
                </>
              )}
            </View>
            <View
              style={{
                marginRight: 20,
              }}
            >
              <AntDesign
                name="rightcircleo"
                size={24}
                color={theme.colors.text}
              />
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default DM;

const styles = StyleSheet.create({});
