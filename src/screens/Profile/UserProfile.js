import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import {
  addFriendRequest,
  getUserProfile,
  removeFriend,
} from "../../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../apis";
import ROUTES from "../../navigation";
import { getChatUser } from "../../apis/chat";
import UserContext from "../../context/UserContext";
import { useTheme } from "@react-navigation/native";
import SkeletonPost from "../../components/Skeleton/SkeletonPost";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserProfile({ route, navigation }) {
  const { userId } = route.params;
  const { user } = useContext(UserContext);
  const { mutate: getChatUserFn } = useMutation({
    mutationFn: (userId) => getChatUser(userId),
    onSuccess: (data) => {
      // console.log(data._id);
      navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.STACK, {
        screen: ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT,
        params: { chatId: data?._id },
      });
    },
  });
  const {
    data: profile,
    isFetching,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    onSuccess: (data) => {
      navigation.setOptions({
        title: data.username || "Profile",
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <Pressable onPress={() => getChatUserFn(data._id)}>
              <MaterialCommunityIcons
                name="chat-plus-outline"
                size={26}
                color={theme.colors.text}
              />
            </Pressable>
          </View>
        ),
      });
    },
  });
  const checkedUser = user;
  const theme = useTheme(); // Get the currently active theme

  const { mutate: addFriendFn } = useMutation({
    mutationFn: () => addFriendRequest(profile?._id),
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: removeFriendFn } = useMutation({
    mutationFn: () => removeFriend(profile?._id),
    onSuccess: () => {
      refetch();
    },
  });
  const checkIfFriend = profile?.friends?.find(
    (friend) => friend === checkedUser._id
  );
  const checkIfRequestedFriend = profile?.friendRequests?.find(
    (requestedFriend) => requestedFriend.from === checkedUser._id
  );
  profile?.posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const numColumns = 2;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View
          style={{ height: 140, flexDirection: "row", borderBottomWidth: 0.2 }}
        >
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              top: -10,
            }}
          >
            <View
              style={{
                width: 82,
                height: 82,
                borderRadius: 50,
                // backgroundColor: theme.colors.text,
                backgroundColor: "lightgray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={{
                  uri: `${BASE_URL}/${profile?.image}`,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: "40%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                top: -20,
              }}
            >
              <View style={{ width: 100, height: 70 }}>
                <Text
                  style={{
                    color: theme.colors.text,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Freinds
                </Text>
                <View
                  style={{
                    width: 100,
                    height: 40,

                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    {profile?.friends.length}
                  </Text>
                </View>
              </View>
            </View>

            {checkIfRequestedFriend ? (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 20,
                  padding: 2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Pending..
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  checkIfFriend ? removeFriendFn() : addFriendFn();
                }}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 20,
                  padding: 2,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  {checkIfFriend ? "Remove Friend" : "Add Friend"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.container}>
          {isLoading ? (
            <View>{<SkeletonPost />}</View>
          ) : profile?.posts ? (
            Array.from({
              length: Math.ceil(profile?.posts.length / numColumns),
            }).map((_, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {profile?.posts
                  .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                  .map((post) => (
                    <View
                      style={{
                        width: "48%",
                        aspectRatio: 1,
                        borderRadius: 20,
                        backgroundColor: "lightgray",
                        margin: "1%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={{ uri: `${BASE_URL}/${post?.image}` }}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </View>
                  ))}
              </View>
            ))
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
  },
});
