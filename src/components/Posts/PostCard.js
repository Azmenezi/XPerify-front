import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";

const PostCard = ({ post, place }) => {
  // console.log(post);
  return (
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
        source={{ uri: `${BASE_URL}/${post.image}` }}
        style={{ height: "100%", width: "100%" }}
      />
      <Pressable
        onPress={() => {
          // console.log(post.user.username);
        }}
        style={{
          height: 40,
          width: 40,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 100,
          top: 10,
          left: 10,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: `${BASE_URL}/${post.user.image}` }}
          style={{ height: "100%", width: "100%" }}
        />
      </Pressable>
    </View>
  );
};

export default PostCard;
