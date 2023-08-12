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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ROUTES from "../../navigation";
import { getChatUser } from "../../apis/chat";
import UserContext from "../../context/UserContext";

export default function UserProfile({ route, navigation }) {
  const { userId } = route.params;
  const { user } = useContext(UserContext);
  const {
    data: profile,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    onSuccess: () => {
      navigation.setOptions({
        title: profile?.username || "Profile",
      });
    },
  });
  const checkedUser = user;

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
      <View style={{ height: 140, flexDirection: "row" }}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
            top: -10,
          }}
        >
          <View style={{ left: 40 }}>
            {checkIfFriend && (
              <View>
                <Pressable onPress={() => getChatUserFn(profile._id)}>
                  <MaterialCommunityIcons
                    name="message-badge"
                    size={24}
                    color="white"
                  />
                </Pressable>
              </View>
            )}
          </View>

          <View
            style={{
              width: 82,
              height: 82,
              borderRadius: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 80, height: 80, borderRadius: 50 }}
              source={{
                uri: `${BASE_URL}/${profile?.image}`,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "70%",
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
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Freinds
              </Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "gray",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 20 }}
                >
                  {profile?.friends.length}
                </Text>
              </View>
            </View>
          </View>
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
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Mood
              </Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "gray",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 20 }}
                >
                  Happy
                </Text>
              </View>
            </View>
          </View>
          {checkIfRequestedFriend ? (
            <View
              style={{
                width: "86%",
                backgroundColor: "gray",
                position: "absolute",
                bottom: 10,
                padding: 2,
                borderRadius: 10,
                right: 17,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
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
                width: "86%",
                backgroundColor: "gray",
                position: "absolute",
                bottom: 10,
                padding: 2,
                borderRadius: 10,
                right: 17,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                {checkIfFriend ? "Remove Friend" : "Add Friend"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerStyle={styles.container}
      >
        {profile?.posts
          ? Array.from({
              length: Math.ceil(profile?.posts.length / numColumns),
            }).map((_, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {profile?.posts
                  .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                  .map((post) => (
                    <View
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 20,
                        backgroundColor: "gray",
                        margin: 10,
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
          : null}
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
