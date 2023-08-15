import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const moodIcon = {
  Study: {
    icon: <FontAwesome name="book" size={30} color="#fff" />,
    color: "#b6225d",
  },
  Meeting: {
    icon: <FontAwesome name="handshake-o" size={30} color="#fff" />,
    color: "#a7e0f6",
  },
  Socialize: {
    icon: <FontAwesome name="comments" size={30} color="#fff" />,
    color: "#f1a686",
  },
  Relax: {
    icon: <FontAwesome name="coffee" size={30} color="#fff" />,
    color: "#f8d7e6",
  },
};

const MoodCard = ({ mood, onPress, isActive }) => {
  const handlePress = () => {
    onPress();
  };

  const iconComponent = moodIcon[mood.name]?.icon;

  return (
    <TouchableOpacity
      style={[styles.card, isActive ? styles.activeCard : {}]}
      onPress={handlePress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: moodIcon[mood.name]?.color },
        ]}
      >
        {moodIcon[mood.name]?.icon}
      </View>
      <Text style={[styles.moodText, isActive ? styles.activeText : {}]}>
        {mood.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    // paddingHorizontal: 20,
    margin: 5,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderWidth: 2,
  },
  activeCard: {
    // backgroundColor: "#252c79", // Background color when isActive is true
  },
  moodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#252c79", // Default text color
  },
  activeText: {
    color: "#252c79",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  iconContainer: {
    backgroundColor: "#E0E0E0", // Background color for the icon
    borderRadius: 10,
    // padding: 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 38,
  },
});

export default MoodCard;
