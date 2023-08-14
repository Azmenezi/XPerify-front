import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const MoodCard = ({ mood, onPress, isActive }) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.card, isActive ? styles.activeCard : {}]}
      onPress={handlePress}
    >
      <Text style={[styles.moodText, isActive ? styles.activeText : {}]}>
        {mood.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderWidth: 2,
  },
  activeCard: {
    backgroundColor: "#252c79", // Background color when isActive is true
  },
  moodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#252c79", // Default text color
  },
  activeText: {
    color: "#FFFFFF", // Text color when isActive is true
  },
});

export default MoodCard;
