import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { getAllMood } from "../../apis/mood";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MoodModal = ({ isVisible, onMoodSelected, onClose }) => {
  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const moodeicon = {
    Working: <MaterialIcons name="work" size={24} color="black" />,
    Celebratory: <MaterialIcons name="cake" size={24} color="black" />,
    "Family-Friendly": (
      <MaterialIcons name="family-restroom" size={24} color="black" />
    ),
    Relaxing: <FontAwesome5 name="user-friends" size={24} color={"black"} />,
    Socializing: <Foundation name="social-myspace" size={24} color="black" />,
    studying: (
      <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
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
                {moods?.map((mood) => (
                  <TouchableOpacity
                    key={mood.id}
                    style={styles.button}
                    onPress={() => onMoodSelected(mood.name)}
                  >
                    <Text style={styles.buttonText}>{mood.name}</Text>
                    {moodeicon[mood.name]}
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalView: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",

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
  buttonText: {
    color: "#ECECEC",
    fontSize: 16,
    fontWeight: "bold",
  },
});
