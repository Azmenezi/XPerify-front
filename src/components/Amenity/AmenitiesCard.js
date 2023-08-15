import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useTheme } from "@react-navigation/native";

const AmenitiesCard = ({ icon, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fadeInAnim = new Animated.Value(0);
  const { colors } = useTheme();

  React.useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  const styles = useStyles(colors);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TouchableOpacity onPress={toggleOpen} style={styles.amenityContainer}>
      <Animated.View style={{ opacity: fadeInAnim }}>
        <Icon name={icon} size={20} color={colors.text} style={styles.icon} />
      </Animated.View>
      {isOpen && <Text style={styles.text}>{name}</Text>}
    </TouchableOpacity>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    amenityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    icon: {
      marginRight: 10,
    },
    text: {
      color: colors.text,
    },
  });

export default AmenitiesCard;
