import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";
import { getNearbyPlaces } from "../../apis/places";
import SkeletonCard from "../SkeletonCard";

const NearbyPlaces = () => {
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
  if (isLoading) return <View>
    {<SkeletonCard />}
    {<SkeletonCard />}

  </View>
  let displayedPlaces = places;
  const renderItem = ({ item }) => {
    return <PlaceCard place={item} />;
  };

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
