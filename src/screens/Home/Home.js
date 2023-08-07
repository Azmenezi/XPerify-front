import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import PlacesList from "../../components/Places/PlacesList";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.space} />
        <PlacesList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
