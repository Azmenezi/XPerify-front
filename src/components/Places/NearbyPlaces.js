import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";
import { getNearbyPlaces } from "../../apis/places";
import { useUserLocation } from "../Location/UserLocation";

const NearbyPlaces = () => {
  const userLocation = useUserLocation();

  if (!userLocation) return <Text>Fetching Location...</Text>;

  const {
    data: places,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["places", userLocation?.latitude, userLocation?.longitude],
    queryFn: () =>
      getNearbyPlaces(userLocation?.latitude, userLocation?.longitude),
    enabled: !!userLocation,
  });

  // Callback function to be called when the user pulls to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);
  if (isLoading) return <Text>Loading...</Text>;
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
