import React, { useCallback, useContext } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import { getAllPlaces } from "../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";
import MoodContext from "../../context/MoodContext";
import PostCard from "../Posts/PostCard";
import SkeletonCard from "../Skeleton/SkeletonCard";

const PlacesList = ({
  searchTerm = "",
  placesData,
  isLoading,
  isFetching,
  refetch,
}) => {
  const { selectedMood } = useContext(MoodContext);
  //Callback function to be called when the user pulls to refresh
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading)
    return (
      <View>
        {<SkeletonCard />}
        {<SkeletonCard />}
      </View>
    );
  let displayedPlaces = placesData;
  if (selectedMood) {
    displayedPlaces = displayedPlaces?.filter(
      (place) =>
        place?.moods?.find((element) => element.name === selectedMood)?.name ===
        selectedMood
    );
  }

  if (searchTerm) {
    displayedPlaces = displayedPlaces?.filter((place) =>
      place?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const renderItem = ({ item }) => <PlaceCard place={item} />;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlacesList;
