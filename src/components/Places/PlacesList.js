import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useCallback, useContext } from "react";
import { getAllPlaces } from "../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";
import MoodContext from "../../context/MoodContext";
import SkeletonCard from "../SkeletonCard";

const PlacesList = ({ searchTerm = "" }) => {
  const {
    data: places,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["places"],
    queryFn: () => getAllPlaces(),
  });

  const { selectedMood } = useContext(MoodContext);

  // Callback function to be called when the user pulls to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <View>
    {<SkeletonCard />}
    {<SkeletonCard />}

  </View>


  let displayedPlaces = places;

  if (selectedMood) {
    displayedPlaces = displayedPlaces.filter((place) =>
      place.moods.includes(selectedMood._id)
    );
  }

  // Filtering places based on search term
  if (searchTerm) {
    displayedPlaces = displayedPlaces.filter((place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

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

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
