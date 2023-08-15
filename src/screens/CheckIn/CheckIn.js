import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NearbyPlaces from "../../components/Places/NearbyPlaces";

const CheckIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nearby Places</Text>
        <Text style={styles.subHeaderText}>Check out places around you!</Text>
      </View>
      <NearbyPlaces />
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  header: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
