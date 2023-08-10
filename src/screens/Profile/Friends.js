import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../apis/auth";
import { getChatUser } from "../../apis/chat";
import ROUTES from "../../navigation";
import { BASE_URL } from "../../apis";
import { useTheme } from "@react-navigation/native";

const Friends = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const {
    data: users,
    isFetching,
    refetch,
  } = useQuery({
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

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.text,
            height: 40,
            paddingLeft: 10,
            borderRadius: 10,
          }}
          placeholder="Search users..."
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        {filteredUsers?.map((user) => {
          return (
            <Pressable
              key={user._id}
              style={{
                height: 100,
                borderWidth: 0.2,
                borderColor: "black",
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

                <Text
                  style={{ color: theme.colors.text, fontSize: 20, top: 14 }}
                >
                  {user.username}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({});
