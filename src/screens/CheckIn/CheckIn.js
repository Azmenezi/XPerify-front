import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NearbyPlaces from "../../components/Places/NearbyPlaces";

const CheckIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Check In</Text>
        <Text style={styles.subHeaderText}>Check in to places around you!</Text>
      </View>
      <NearbyPlaces />
    </SafeAreaView>
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
