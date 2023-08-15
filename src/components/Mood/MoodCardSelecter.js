import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";

const MoodCardSelector = ({ icon, name, _id, data, setData }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useTheme();

  const styles = useStyles(colors);

  const toggleAmenity = () => {
    let moods = data.moods ? [...data.moods] : [];

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
          backgroundColor: isPressed ? "#5f67ec" : "#182039",
          opacity: isPressed ? 1 : 0.7,
          ...Platform.select({
            android: {
              elevation: isPressed ? 10 : 0,
            },
            ios: {
              shadowOpacity: isPressed ? 0.3 : 0,
              shadowRadius: 4,
              shadowOffset: { height: 4, width: 4 },
            },
          }),
        },
      ]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Toggle ${name}`}
      accessibilityHint={`Toggles the selection for ${name}`}
    >
      <Icon name={icon} size={20} color="#fff" style={styles.icon} />
      <Text style={[styles.text, { color: "#fff" }]}>{name}</Text>
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
      fontWeight: "bold",
    },
  });

export default MoodCardSelector;
