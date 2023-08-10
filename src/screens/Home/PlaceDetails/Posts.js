import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getPlacePosts } from "../../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/Posts/PostCard";

export default function Posts({ _id, navigation }) {
  const { data: posts } = useQuery(["place-posts"], () => getPlacePosts(_id));

  const numColumns = 2;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts
        ? Array.from({ length: Math.ceil(posts.length / numColumns) }).map(
            (_, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {posts
                  .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                  .map((post) => (
                    <PostCard post={post} key={post.id} />
                  ))}
              </View>
            )
          )
        : null}
    </ScrollView>
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
