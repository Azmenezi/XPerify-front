import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getMyProfile } from "../../apis/auth";
import { useFocusEffect } from "@react-navigation/native";

const ProfileInfo = () => {
  const { data: profileFun, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["profile"]);
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: !profileFun?.image
              ? "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
              : `${BASE_URL}/${profileFun?.image}`,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.username}>@{profileFun?.username}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
