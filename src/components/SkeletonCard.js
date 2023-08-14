import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.imageSkeleton}></View>
            <View style={styles.contentContainer}>


                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonSkeleton}></View>
                    <View style={styles.buttonSkeleton}></View>
                    <View style={styles.buttonSkeleton}></View>

                </View>

                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        margin: 20,
        borderRadius: 15,
        flexDirection: "column",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: "hidden",
    },
    imageSkeleton: {
        width: "100%",
        height: 200,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        marginBottom: 10,
    },
    contentContainer: {
        flexDirection: "column",
    },
    textSkeleton: {
        width: "100%",
        height: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        marginBottom: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "auto",
    },
    buttonSkeleton: {
        width: 60,
        height: 30,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
    },
});

export default SkeletonCard;
