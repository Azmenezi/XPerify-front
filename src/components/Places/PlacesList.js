import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAllPlaces } from "../../apis/places";
import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard";

const PlacesList = () => {
  const { data: places, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => getAllPlaces(),
  });
  console.log(places);
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
