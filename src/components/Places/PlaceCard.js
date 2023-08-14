import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "../../navigation";
import LocationInfo from "../Location/LocationInfo";
import { FontAwesome } from "@expo/vector-icons";

const PlaceCard = ({ place }) => {
  const routName = useRoute();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        routName.name === ROUTES.HEDERROUTES.PLACE_STACK.HOME
          ? navigation.push(
              ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS,
              {
                _id: place._id,
                posts: place.posts,
              },
              (key = { _id: place._id })
            )
          : navigation.navigate(ROUTES.HEDERROUTES.CHECKIN_STACK.POST, {
              _id: place._id,
            });
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}/${place.image}` }}
            style={styles.image}
            blurRadius={2}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoLayer}>
          <Text style={styles.text}>{place.name}</Text>
          <View style={styles.bottomInfo}>
            <View style={styles.locationContainer}>
              <LocationInfo
                placeLon={place?.location?.coordinates[0]}
                placeLat={place?.location?.coordinates[1]}
              />
            </View>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={24} color="#ff9056" />
              <Text style={styles.ratingText}>{` ${place.ratings}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 5,
    width: "90%",
    borderColor: "#182039",
    borderWidth: 1,
    backgroundColor: "#23293e",
  },

  imageContainer: {
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
  },

  infoLayer: {
    paddingHorizontal: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 26,
    // color: "#252c79",
    color: "#fff",
    marginBottom: 8,
    marginLeft: 5,
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
    margin: 6,
    // backgroundColor: "pink",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    marginLeft: 180,
    // backgroundColor: "red",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 18,
    color: "#fff",
  },
});
