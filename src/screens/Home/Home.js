import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import PlacesList from "../../components/Places/PlacesList";
import MoodList from "../../components/Mood/MoodList";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMoodSelected = (mood) => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for a place..."
      />
      <View>
        <MoodList onMoodSelected={handleMoodSelected} />
      </View>
      {/* You can pass searchTerm to PlacesList if you want to filter places */}
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
    height: 40,
    borderColor: "#ECECEC",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    margin: 10,
  },

  moodButton: {
    backgroundColor: "rgba(0, 128, 128, 0.6)", // Transparent deep teal
    padding: 12,
    borderRadius: 8,
    width: "94%",
    marginLeft: 16,
  },
  moodButtonText: {
    color: "#ECECEC",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
