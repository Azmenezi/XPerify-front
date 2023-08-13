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
import Svg, { Path, Rect } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

const MoodModal = ({ isVisible, onMoodSelected, onClose }) => {
  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });
  const theme = useTheme();
  const { setSelectedMood } = useContext(MoodContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const moodeicon = {
    Working: (
      <MaterialIcons
        name="work"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Celebratory: (
      <FontAwesome
        name="birthday-cake"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Family: (
      <MaterialIcons
        name="family-restroom"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Relaxing: (
      <FontAwesome5
        name="umbrella-beach"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Socializing: (
      <AntDesign
        name="message1"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Studying: (
      <Feather
        name="book-open"
        size={24}
        color="black"
        style={{ marginRight: 20 }}
      />
    ),
    Meeting: (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        style={{ width: 50, height: 30 }}
      >
        <Rect
          x="217.6"
          y="371.2"
          style={{ fill: "#6D7584" }}
          width="76.8"
          height="76.8"
        />
        <Rect
          x="12.8"
          y="64"
          style={{ fill: "#6FB0B6" }}
          width="486.4"
          height="307.2"
        />
        <Path
          style={{ fill: "#573A32" }}
          d="M486.4,51.2H25.6C11.46,51.2,0,62.66,0,76.8v281.6C0,372.54,11.46,384,25.6,384h179.2v51.2H102.4  c-7.074,0-12.8,5.726-12.8,12.8s5.726,12.8,12.8,12.8h307.2c7.074,0,12.8-5.726,12.8-12.8s-5.726-12.8-12.8-12.8H307.2V384h179.2  c14.14,0,25.6-11.46,25.6-25.6V76.8C512,62.66,500.54,51.2,486.4,51.2z M281.6,435.2h-51.2V384h51.2V435.2z M486.4,358.4H25.6V76.8  h460.8V358.4z"
        />
      </Svg>
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
                    <Text
                      style={{
                        color: theme.colors.invertedText, // Changed text color to white
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      All
                    </Text>
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
                      <Text
                        style={{
                          color: theme.colors.invertedText, // Changed text color to white
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {mood.name}
                      </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    backgroundColor: "#F7F7F7",

    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    // backgroundColor: "#00A5A5", // Adjusted button color
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    fontSize: 33,
    marginRight: 15, // Added margin to separate the icon and text
    color: "#FFFFFF", // Adjusted icon color to white
  },
});
