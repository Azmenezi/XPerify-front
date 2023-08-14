import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
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
  if (!displayedPlaces)
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
        <Text style={{ color: theme.colors.text }}>
          No nearby location to check in to
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
