import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import ROUTES from "../../navigation";
import { useTheme } from "@react-navigation/native";

const PostCard = ({ post, navigation, checkedUser }) => {
  const theme = useTheme(); // Get the currently active theme
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
          post?.user?._id === checkedUser._id
            ? navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.STACK)
            : navigation.navigate(ROUTES.HEDERROUTES.PLACE_STACK.PROFILE, {
                userId: post.user._id,
                checkedUser,
              });
        }}
        style={{
          height: 40,
          width: 40,
          position: "absolute",
          backgroundColor: theme.colors.text,
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
