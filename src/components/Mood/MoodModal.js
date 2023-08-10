import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { getAllMood } from "../../apis/mood";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import MoodContext from "../../context/MoodContext";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const MoodModal = ({ isVisible, onMoodSelected, onClose }) => {
  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  const { setSelectedMood } = useContext(MoodContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const moodeicon = {
    Working: (
      <MaterialIcons
        name="work"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Celebratory: (
      <FontAwesome
        name="birthday-cake"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Family: (
      <MaterialIcons
        name="family-restroom"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Relaxing: (
      <FontAwesome5
        name="umbrella-beach"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Socializing: (
      <AntDesign
        name="message1"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Studying: (
      <Feather
        name="book-open"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
    Meeting: (
      <FontAwesome
        name="handshake-o"
        size={24}
        color="white"
        style={{ marginRight: 20 }}
      />
    ),
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalView}>
              <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    onMoodSelected(null);
                    setSelectedMood(null);
                  }}
                >
                  <View style={styles.row}>
                    <Text style={styles.buttonText}>All</Text>
                  </View>
                </TouchableOpacity>
                {moods?.map((mood) => (
                  <TouchableOpacity
                    key={mood.id}
                    style={styles.button}
                    onPress={() => {
                      onMoodSelected(mood.name);
                      setSelectedMood(mood);
                    }}
                  >
                    <View style={styles.row}>
                      {moodeicon[mood.name]}
                      <Text style={styles.buttonText}>{mood.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MoodModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  modalView: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.7)",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    backgroundColor: "#008080",
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // centers items vertically
    justifyContent: "space-between", // add space between the items
  },
  buttonText: {
    color: "#ECECEC",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 33,
  },
});
