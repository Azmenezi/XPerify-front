import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { getAllPlaces } from "../../apis/places";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";

const PlacesList = () => {
  const {
    data: places,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getAllPlaces,
  });

  // Callback function to be called when the user pulls to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Text>Loading...</Text>;

  const renderItem = ({ item }) => {
    return <PlaceCard place={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
