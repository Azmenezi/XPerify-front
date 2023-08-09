import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import AmenitiesList from "./AmenitiesList"; // Make sure to adjust the import path

const AmenitiesModal = ({ isVisible, closeModal }) => {
    const { colors } = useTheme();

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>Amenities</Text>
                    <AmenitiesList />
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Text style={{ color: colors.primary }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 20,
    },
});

export default AmenitiesModal;
