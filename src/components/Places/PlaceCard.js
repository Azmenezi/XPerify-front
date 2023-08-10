import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "../../navigation";

const PlaceCard = ({ place }) => {
  const routName = useRoute();
  console.log(routName);

  const navigation = useNavigation();
  console.log(`${BASE_URL}/${place.image}`);
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
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "90%",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  infoLayer: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 28,
    color: "black",
  },
});
