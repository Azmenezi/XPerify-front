import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getPlacePosts } from "../../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/Posts/PostCard";
import { useFocusEffect } from "@react-navigation/native";

export default function Posts({ _id, navigation, setIsPlace, isPlace }) {
  const { data: posts } = useQuery(["place-posts"], () => getPlacePosts(_id));

  useFocusEffect(
    React.useCallback(() => {
      setIsPlace(true);
    }, [])
  );

  const numColumns = 2;
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y >= 200) {
          if (isPlace) {
            setIsPlace(false);
          }
        } else {
          if (!isPlace) {
            setIsPlace(true);
          }
        }
      }}
    >
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
