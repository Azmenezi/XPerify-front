import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Image,
} from "react-native";
import FriendRequestModal from "./FriendRequestModal";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getMyProfile,
} from "../../apis/auth";
import { useTheme } from "@react-navigation/native";

export default function FriendRequest() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () => getMyProfile(),
  });
  const accept = useMutation({
    mutationFn: (friendRequestId) => {
      return acceptFriendRequest(friendRequestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getMyProfile");
      refetch();
    },
  });
  const decline = useMutation({
    mutationFn: (friendRequestId) => {
      return declineFriendRequest(friendRequestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getMyProfile");
      refetch();
    },
  });

  const handleAccept = (friendRequestId) => {
    accept.mutate(friendRequestId);
  };

  const handleDecline = (friendRequestId) => {
    decline.mutate(friendRequestId);
  };
  const theme = useTheme(); // Get the currently active theme
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={styles.container}
    >
      {user?.friendRequests?.length > 0 ? (
        user?.friendRequests.map((friendRequest, index) => (
          <FriendRequestModal
            key={friendRequest.id}
            index={index}
            onAccept={() => handleAccept(friendRequest._id)}
            onDecline={() => handleDecline(friendRequest._id)}
            friendRequest={friendRequest}
          />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{
              uri: `https://cdn.discordapp.com/attachments/1135993254131802332/1141038577136959648/Push_notifications-amico.png`,
            }}
            style={{ height: "100%", width: "100%" }}
          />
          <View
            style={{
              height: 100,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <Text
            style={{
              color: theme.colors.whiteText,
              fontSize: 30,
              position: "absolute",
            }}
          >
            You have no notifications
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
