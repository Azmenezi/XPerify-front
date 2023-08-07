import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceTopNavigations from "../../../navigation/PlaceTopNavigation";
import PlaceInformation from "../../../components/Places/PlaceInformation";

const PlaceDetails = ({ route }) => {
  const { _id } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PlaceInformation _id={_id} />
      <PlaceTopNavigations />
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
