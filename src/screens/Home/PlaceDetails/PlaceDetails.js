import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PlaceTopNavigations from "../../../navigation/PlaceTopNavigation";
import PlaceInformation from "../../../components/Places/PlaceInformation";
import { Animated } from "react-native";

const PlaceDetails = ({ route, navigation }) => {
  const { _id } = route.params;

  const [isPlace, setIsPlace] = useState(true);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <PlaceInformation _id={_id} isPlace={isPlace} setIsPlace={setIsPlace} />
      <PlaceTopNavigations
        _id={_id}
        navigation={navigation}
        setIsPlace={setIsPlace}
        isPlace={isPlace}
      />
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // minHeight: 200,
  },
});
