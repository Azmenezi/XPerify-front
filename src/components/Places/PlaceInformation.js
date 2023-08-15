import {
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getPlaceAmenities, getPlaceById } from "../../apis/places";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../apis";
import { useTheme } from "@react-navigation/native";
import LocationInfo from "../Location/LocationInfo";
import AmenitiesList from "../Amenity/AmenitiesList";

export default function PlaceInformation({ _id, isPlace }) {
  const { data: place } = useQuery(["place", _id], () => getPlaceById(_id));
  const theme = useTheme();
  const image = { uri: `${BASE_URL}/${place?.image}` };
  console.log(place);
  const heightAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isPlace ? 380 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isPlace]);

  return (
    <Animated.View style={{ height: heightAnim }}>
      {isPlace && (
        <View>
          <View
            style={{
              borderBottomLeftRadius: 140,
              overflow: "hidden",
            }}
          >
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.overlay}></View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.title, { color: theme.colors.darkBlue }]}>
              {place?.name}
            </Text>
            <View>
              <Text style={[styles.description, { color: theme.colors.text }]}>
                {place?.description}
              </Text>
            </View>
            <View style={{}}>
              <View>
                <AmenitiesList amenities={place?.amenities} />
              </View>
              <View style={styles.locationContainer}>
                <LocationInfo
                  placeLon={place?.location?.coordinates[0]}
                  placeLat={place?.location?.coordinates[1]}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 43,
  },
  description: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
  },
});

{
  /* <View
style={{ flexDirection: "row", gap: 7, marginHorizontal: 10 }}
> */
}
{
  /* <AntDesign name="star" size={24} color="#e69640" /> */
}
{
  /* <Text style={{ fontSize: 20, color: theme.colors.text }}>
  4.5
</Text> */
}

{
  /* </View> */
}

{
  /* <Text style={[styles.description, { color: theme.colors.text }]}></Text> */
}

{
  /* <View
style={{ flexDirection: "row", gap: 7, marginHorizontal: 10 }}
> */
}
{
  /* <AntDesign name="star" size={24} color="#e69640" /> */
}
{
  /* <Text style={{ fontSize: 20, color: theme.colors.text }}>
  4.5
</Text> */
}

{
  /* </View> */
}

{
  /* <Text style={[styles.description, { color: theme.colors.text }]}></Text> */
}
