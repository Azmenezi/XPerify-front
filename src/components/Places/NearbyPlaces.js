import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";
import { getNearbyPlaces } from "../../apis/places";
import { useTheme } from "@react-navigation/native";
import SkeletonCard from "../Skeleton/SkeletonCard";

const NearbyPlaces = () => {
  const theme = useTheme(); // Get the currently active theme
  const {
    data: places,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["nearbyPlaces"],
    queryFn: () => getNearbyPlaces(),
  });

  // Callback function to be called when the user pulls to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  let displayedPlaces = places;
  const renderItem = ({ item }) => {
    return <PlaceCard place={item} />;
  };

  if (isLoading)
    return (
      <View>
        {<SkeletonCard />}
        {<SkeletonCard />}
      </View>
    );
  if (!displayedPlaces || displayedPlaces?.length == 0)
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      >
        <Image
          source={{
            uri: `https://cdn.discordapp.com/attachments/1135993254131802332/1141035488111763586/Closed_Stores-amico.png`,
          }}
          style={{ height: "100%", width: "100%" }}
        />

        <Text
          style={{
            color: "black",
            fontSize: 30,
            position: "absolute",
            bottom: 10,
          }}
        >
          No nearby locations
        </Text>
      </ScrollView>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NearbyPlaces;

const styles = StyleSheet.create({});
