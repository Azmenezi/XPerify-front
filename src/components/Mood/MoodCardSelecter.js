import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";

const MoodCardSelecter = ({ icon, name, _id, data, setData }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useTheme();

  const styles = useStyles(colors);
  const toggleAmenity = () => {
    let moods = [];
    if (data.moods) {
      moods = [...data.moods];
    }

    if (isPressed) {
      const index = moods.indexOf(_id);
      if (index > -1) {
        moods.splice(index, 1);
      }
    } else {
      moods.push(_id);
    }

    setData({ ...data, moods });
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity
      onPress={toggleAmenity}
      style={[
        styles.amenityContainer,
        {
          backgroundColor: isPressed ? "#f8bc9f" : "#182039", // orange when pressed, darkBlue when not
        },
      ]}
    >
      <Icon name={icon} size={20} color="#fff" style={styles.icon} />
      {/* White icon color for contrast */}
      <Text style={[styles.text, { color: "#fff" }]}>{name}</Text>
      {/* White text color for contrast */}
    </TouchableOpacity>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    amenityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      margin: 5,
      padding: 10,
      borderRadius: 5,
    },
    icon: {
      marginRight: 10,
    },
    text: {
      fontWeight: "bold", // Bold font weight
    },
  });

export default MoodCardSelecter;
