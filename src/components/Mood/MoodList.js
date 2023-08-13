import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllMood } from "../../apis/mood";
import MoodContext from "../../context/MoodContext";
import MoodCard from "./MoodCard";

const MoodList = ({ onMoodSelected }) => {
  const { data: moods, isLoading } = useQuery({
    queryKey: ["moods"],
    queryFn: getAllMood,
  });

  const { setSelectedMood } = useContext(MoodContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moods}
        horizontal={true}
        renderItem={({ item }) => (
          <MoodCard
            mood={item}
            onPress={() => {
              onMoodSelected(item.name);
              setSelectedMood(item);
            }}
          />
        )}
        //keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  moodButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MoodList;
