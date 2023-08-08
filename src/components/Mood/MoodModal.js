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

const MoodModal = ({ isVisible, onMoodSelected, onClose }) => {
  const [selectAll, setSelectAll] = useState(false);

  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  const { setSelectedMood } = useContext(MoodContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const moodeicon = {
    Working: <Text style={styles.icon}> 💼 </Text>,
    Celebratory: <Text style={styles.icon}> 🎉 </Text>,
    Family: <Text style={styles.icon}> 👨‍👩‍👧‍👦 </Text>,
    Relaxing: <Text style={styles.icon}> 🏖 </Text>,
    Socializing: <Text style={styles.icon}> 💬 </Text>,
    Studying: <Text style={styles.icon}> 📚 </Text>,
    Meeting: <Text style={styles.icon}> 🤝 </Text>,
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
    marginRight: 10, // added space to separate text and icon
  },
  icon: {
    fontSize: 33,
  },
});
