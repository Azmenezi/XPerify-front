import React from "react";
import { View, StyleSheet } from "react-native";
import FriendRequestModal from "./FriendRequestModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, declineFriendRequest, getMyProfile } from "../../apis/auth";

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
    },
  });
  const decline = useMutation({
    mutationFn: (friendRequestId) => {
      return declineFriendRequest(friendRequestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getMyProfile");
    },
  });

  const handleAccept = (friendRequestId) => {
    accept.mutate(friendRequestId);
  };

  const handleDecline = (friendRequestId) => {
    decline.mutate(friendRequestId);
  };

  return (
    <View style={styles.container}>
      {user?.friendRequests.map((friendRequest, index) => (

        <FriendRequestModal
          key={friendRequest.id}
          index={index}
          onAccept={() => handleAccept(friendRequest._id)}
          onDecline={() => handleDecline(friendRequest._id)}
          friendRequest={friendRequest}
        />
      ))}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
