import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import { getPlacePosts } from "../../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/Posts/PostCard";
import { BASE_URL } from "../../../apis";

export default function MyPost({ posts, refetch, isFetching }) {
  posts?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const numColumns = 2;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={styles.container}
    >
      {posts
        ? Array.from({ length: Math.ceil(posts.length / numColumns) }).map(
            (_, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {posts
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
