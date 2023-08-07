import { StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { getAllMood } from "../../apis/mood";
import { useQuery } from "@tanstack/react-query";

const MoodDropdown = () => {
  const { data: mood, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  if (isLoading) return "Loading...";

  return (
    <View style={styles.dropdownContainer}>
      <Picker style={styles.dropdown}>
        {mood.map((item, index) => (
          <Picker.Item key={index} label={item.name} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default MoodDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    width: "100%",
  },
});
