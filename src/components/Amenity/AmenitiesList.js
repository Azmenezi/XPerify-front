import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMemoOne } from "use-memo-one";
import AmenitiesCard from "../Amenity/AmenitiesCard";
import { getAllAmenities } from "../../apis/amenity";
import { useQuery } from "@tanstack/react-query";

const AmenitiesList = () => {
  const { colors } = useTheme();

  const {
    data: amenities,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => getAllAmenities(),
  });

  const styles = useStyles(colors);

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {amenities?.map((amenity, index) => (
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
