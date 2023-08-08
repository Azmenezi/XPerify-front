import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMemoOne } from "use-memo-one";
import AmenitiesCard from "../Amenity/AmenitiesCard";

const AmenitiesList = () => {
  const { colors } = useTheme();

  const amenities = useMemoOne(
    () => [
      { name: "Free Wi-Fi", icon: "wifi" },
      { name: "Parking", icon: "car" },
      { name: "Outdoor Seating", icon: "tree" },
      { name: "Pet Friendly", icon: "paw" },
      { name: "Wheelchair Accessible", icon: "wheelchair" },
      { name: "Air Conditioning", icon: "snowflake-o" },
      { name: "Smoking Area", icon: "cloud" },
      { name: "Toilets", icon: "bath" },
      { name: "Playground", icon: "child" },
      { name: "Vegan Options", icon: "leaf" },
    ],
    []
  );

  const styles = useStyles(colors);

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {amenities.map((amenity, index) => (
        <AmenitiesCard key={index} icon={amenity.icon} name={amenity.name} />
      ))}
    </ScrollView>
  );
};

const useStyles = (colors) =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
  });

export default AmenitiesList;
