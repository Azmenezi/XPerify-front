import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  FontAwesome,
  Feather,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const iconColors = {
  Working: "#ff9056",

  Celebratory: "#f67262",
  Family: "#5f67ec",

  Relaxing: "#5f67ec",

  Socializing: "#252c79",

  Studying: "#f67262",
  Meeting: "#252c79",
};

const moodIcon = {
  Working: {
    icon: <MaterialIcons name="work" size={24} color="white" />,
    color: iconColors.Working,
  },
  Celebratory: {
    icon: <FontAwesome name="birthday-cake" size={24} color="white" />,
    color: iconColors.Celebratory,
  },
  Family: {
    icon: <MaterialIcons name="family-restroom" size={24} color="white" />,
    color: iconColors.Family,
  },
  Relaxing: {
    icon: <FontAwesome5 name="umbrella-beach" size={24} color="white" />,
    color: iconColors.Relaxing,
  },
  Socializing: {
    icon: <AntDesign name="message1" size={24} color="white" />,
    color: iconColors.Socializing,
  },
  Studying: {
    icon: <Feather name="book-open" size={24} color="white" />,
    color: iconColors.Studying,
  },
  Meeting: {
    icon: <FontAwesome name="handshake-o" size={24} color="white" />,
    color: iconColors.Meeting,
  },
};

const MoodCard = ({ mood, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View
      style={[
        styles.iconBackground,
        { backgroundColor: moodIcon[mood.name]?.color || "#E0E0E0" },
      ]}
    >
      {moodIcon[mood.name]?.icon}
    </View>
    <Text style={styles.moodText}>{mood.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  moodText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#252c79",
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoodCard;
