import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useMemoOne } from "use-memo-one";
import AmenitiesCard from "../Amenity/AmenitiesCard";

const AmenitiesList2 = () => {
    const { colors } = useTheme();

    const amenities = useMemoOne(
        () => [
            { name: "Free Wi-Fi", icon: "wifi" },
            { name: "Parking", icon: "car" },
            { name: "Outdoor Seating", icon: "tree" },

            { name: "Air Conditioning", icon: "snowflake-o" },

            { name: "Toilets", icon: "bath" },

        ],
        []
    );

    const styles = useStyles(colors);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={true}

        >
            {amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                    <AmenitiesCard key={index} icon={amenity.icon} name={amenity.name} />
                    <View style={styles.rateButtonsContainer}>
                        <Text>Rate:</Text>
                        <View style={styles.rateButton}>
                            <Text>Available</Text>
                        </View>
                        <View style={styles.rateButton}>
                            <Text>Unavailable</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const useStyles = (colors) =>
    StyleSheet.create({
        container: {
            padding: 10,
        },
        amenityItem: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        rateButtonsContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
        },
        rateButton: {
            borderWidth: 1,
            borderColor: "gray",
            padding: 5,
            borderRadius: 5,
            marginLeft: 5,
        },
    });

export default AmenitiesList2;
