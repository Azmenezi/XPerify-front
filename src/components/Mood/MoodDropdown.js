import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { getAllMood } from "../../apis/mood";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native-paper";

const MoodDropdown = () => {
  const [selectedMood, setSelectedMood] = useState("");

  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        // selectedValue={selectedMood}
        onValueChange={(itemValue) => setSelectedMood(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item key={"dsjkkdj"} label="test" value="test" />
        <Picker.Item key={"ddssjkkdj"} label="test" value="test" />
        <Picker.Item key={"dsdswejkkdj"} label="test" value="test" />
        <Picker.Item key={"dssdakjjkkdj"} label="test" value="test" />

        {moods?.map((item, index) => (
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
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    hight: 100,
  },
  dropdown: {
    height: 50,
    width: "90%",
  },
});
