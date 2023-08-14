import React, { useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PlacesList from "../../components/Places/PlacesList";
import MoodList from "../../components/Mood/MoodList";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getAllPlaces } from "../../apis/places";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMoodSelected = (mood) => {
    setIsModalVisible(false);
  };
  const {
    data: placesData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getAllPlaces,
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MoodMap</Text>
          <Text style={styles.subTitle}>Find places that fit your mood</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <FontAwesome5
            name="search-location"
            size={24}
            color="182039"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search for a place..."
          />
        </View>
        {/* <Text style={styles.subTitle}>
        Match your vibe: Filter places by mood!
      </Text> */}
        <View style={{ backgroundColor: "" }}>
          <MoodList onMoodSelected={handleMoodSelected} />
        </View>
        <PlacesList
          searchTerm={searchTerm}
          placesData={placesData}
          refetch={refetch}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 34,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: "gray",
    height: 50,
  },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 10,
    width: "90%",
    alignSelf: "center",
  },

  searchIcon: {
    position: "absolute", // Position it absolutely
    left: 16, // Give it a little left margin
    zIndex: 1, // Ensure it's on top
  },

  titleContainer: {
    justifyContent: "center",
    marginVertical: 10,
    margin: 30,
  },
  title: {
    fontSize: 28,
    color: "#252c79",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
});
