import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";

const AmenitiesCardSelecter = ({ icon, name, _id, data, setData }) => {
  const [isPressed, setIsPressed] = useState(false);
  const fadeInAnim = new Animated.Value(0); // Animation value for fade-in effect
  const { colors } = useTheme();

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  const styles = useStyles(colors);

  const toggleAmenity = () => {
    let amenities = [];
    if (data.amenities) {
      amenities = [...data.amenities];
    }

    if (isPressed) {
      const index = amenities.indexOf(_id);
      if (index > -1) {
        amenities.splice(index, 1);
      }
    } else {
      amenities.push(_id);
    }

    setData({ ...data, amenities });
    setIsPressed(!isPressed);
  };

  return (
    <TouchableOpacity
      onPress={toggleAmenity}
      style={[
        styles.amenityContainer,
        {
          backgroundColor: isPressed ? colors.amititycard : colors.background,
          opacity: fadeInAnim,
        },
      ]}
    >
      <Icon
        name={icon}
        size={20}
        color={isPressed ? "#fff" : colors.text}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: isPressed ? "#fff" : colors.text }]}>
        {name}
      </Text>
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

export default AmenitiesCardSelecter;
