import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigation";

const PlaceCard = ({ place }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS, {
          _id: place._id,
        });
      }}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/${place.image}` }}
          style={styles.image}
        />
        <Text style={styles.text}>{place.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#fff",
    margin: 17,

    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "gray",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    width: "94%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: 150,
  },
  text: {
    margin: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 31,
  },
});
