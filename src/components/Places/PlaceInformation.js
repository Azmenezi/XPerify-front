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
import { AntDesign, Entypo } from "@expo/vector-icons";
import LocationInfo from "../Location/LocationInfo";
import { FontAwesome } from "@expo/vector-icons";

export default function PlaceInformation({ _id, isPlace }) {
  const { data: place } = useQuery(["place", _id], () => getPlaceById(_id));
  const {
    data: aminity,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["aminity"],
    queryFn: () => getPlaceAmenities(),
  });
  const image = { uri: `${BASE_URL}/${place?.image}` };
  const theme = useTheme();

  const heightAnim = useState(new Animated.Value(0))[0]; // 200 is the height of the ImageBackground

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isPlace ? 400 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isPlace]);

  return (
    <Animated.View style={{ height: heightAnim }}>
      {isPlace && (
        <View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 200,
                width: 500,
                backgroundcolor: theme.colors.invertedText,
                opacity: 0.2,
                position: "absolute",
              }}
            ></View>
          </ImageBackground>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 45,
                color: theme.colors.text,
                marginHorizontal: 10,
              }}
            >
              {place?.name}
            </Text>

            <Text
              style={{
                fontSize: 20,
                marginHorizontal: 10,
                marginBottom: 40,
                color: theme.colors.primary,
              }}
            >
              {place?.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 7,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            >
              <LocationInfo
                placeLon={place?.location?.coordinates[0]}
                placeLat={place?.location?.coordinates[1]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 5,
              }}
            >
              <FontAwesome name="star" size={24} color="#252c79" />
              <Text style={{ marginLeft: 5, color: theme.colors.primary }}>
                {place?.ratings}
              </Text>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
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
