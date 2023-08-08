import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import PlacesList from "../../components/Places/PlacesList";
import MoodModal from "../../components/Mood/MoodModal";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMoodSelected = (mood) => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.moodButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.moodButtonText}>Select your mood</Text>
      </TouchableOpacity>

      <MoodModal
        isVisible={isModalVisible}
        onMoodSelected={handleMoodSelected}
        onClose={() => setIsModalVisible(false)}
      />
      <PlacesList />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
