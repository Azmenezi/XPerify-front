// moodsCard.js
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
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
      // If the amenity is pressed, remove the _id from the array
      const index = moods.indexOf(_id);
      if (index > -1) {
        moods.splice(index, 1);
      }
    } else {
      // If the amenity is not pressed, add the _id to the array
      moods.push(_id);
    }
    // console.log(moods);
    // Set the new moods
    setData({ ...data, moods });
    // Toggle the pressed state
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity
      onPress={toggleAmenity}
      style={[
        styles.amenityContainer,
        { backgroundColor: isPressed ? colors.primary : colors.popMenu },
      ]}
    >
      <Icon name={icon} size={20} color={colors.text} style={styles.icon} />
      <Text style={styles.text}>{name}</Text>
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
      color: colors.text,
    },
  });

export default MoodCardSelecter;
