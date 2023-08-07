import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getPlaceById } from "../../apis/places";

const PlaceDetails = ({ route }) => {
  const _id = route.params._id;
  //   const { data: place, isLoading } = useQuery(["place", _id], () =>
  //     getPlaceById(_id)
  //   );

  return (
    <View>
      <Text>PlaceDetails</Text>
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({});
