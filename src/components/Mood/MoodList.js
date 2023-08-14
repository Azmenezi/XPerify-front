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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <MoodCard
            mood={item}
            onPress={() => {
              onMoodSelected(item.name);
              setSelectedMood(item);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 10, // Adds padding to the start and end of the list
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
