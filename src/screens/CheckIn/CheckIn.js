import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NearbyPlaces from "../../components/Places/NearbyPlaces";

const CheckIn = () => {
  return (
    <View style={{ flex: 1 }}>
      <NearbyPlaces />
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({});
