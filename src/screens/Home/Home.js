import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import PlacesList from "../../components/Places/PlacesList";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{}} />
        <PlacesList />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
