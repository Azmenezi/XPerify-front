import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "../../navigation";

import LocationInfo from "../Location/LocationInfo";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const PlaceCard = ({ place }) => {
  const routName = useRoute();
  const navigation = useNavigation();

  const theme = useTheme();

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
              <FontAwesome name="star" size={24} color="#182039" />
              <Text style={styles.ratingText}>{` ${place.ratings}`}</Text>
            </View>
          </View>

          {/* <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              color: theme.colors.invertedText,
            }}
          >
            {place.name}
          </Text> */}
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
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    borderWidth: 1,
    borderColor: "lightgray",
    shadowRadius: 0.2,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 0.6,
    alignItems: "center",
    shadowColor: "gray",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    resizeMode: "contain",
    height: 140,
    resizeMode: "cover",
    margin: 2,
    borderWidth: 0.3,
    borderColor: "gray",
    shadowOpacity: 0.3,
  },

  infoLayer: {
    flex: 0.4,
    padding: 12,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 15,
  },

  text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#182039",
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
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    marginLeft: 180,
  },

  ratingText: {
    marginLeft: 5,
    fontSize: 18,
    color: "black",
  },
});
