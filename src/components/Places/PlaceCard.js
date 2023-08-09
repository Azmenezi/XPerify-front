import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "../../navigation";

const PlaceCard = ({ place }) => {
  const routName = useRoute();

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        routName.name === ROUTES.HEDERROUTES.PLACE_STACK.HOME
          ? navigation.navigate(ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS, {
              _id: place._id,
            })
          : navigation.navigate(ROUTES.HEDERROUTES.CHECKIN_STACK.POST, {
              _id: place._id,
            });
      }}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/${place.image}` }}
          style={styles.image}
          blurRadius={2}
        />
        <View style={styles.infoLayer}>
          <Text style={styles.text}>{place.name}</Text>
          {/* Additional information here */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",

    backgroundColor: "rgba(0,0,0,0.3)",
    margin: 17,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "gray",
    width: "94%",
    height: 240,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  infoLayer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 10,
  },

  text: {
    fontWeight: "bold",
    fontSize: 31,
    color: "white",
  },
});
