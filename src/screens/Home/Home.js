import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import PlacesList from "../../components/Places/PlacesList";
import MoodList from "../../components/Mood/MoodList";
import { FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMoodSelected = (mood) => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <FontAwesome5
          name="search-location"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search for a place..."
        />
      </View>
      <View style={{ backgroundColor: "#fef0ea" }}>
        <MoodList onMoodSelected={handleMoodSelected} />
      </View>
      <PlacesList searchTerm={searchTerm} />
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
    borderColor: "#182039",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: "#f3f4f6",
  },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 10,
    height: 40,
  },

  searchIcon: {
    marginRight: 8, // Adds spacing between the icon and the TextInput
  },

  moodButton: {
    backgroundColor: "rgba(0, 128, 128, 0.6)",
    padding: 12,
    borderRadius: 8,
    width: "94%",
    marginLeft: 16,
  },
});
