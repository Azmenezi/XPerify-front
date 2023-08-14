import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { getLocationAddress } from "../../apis/location";
import UserContext from "../../context/UserContext";
import { CalculateDistance } from "./CalculateDistance";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";
// import { useUserLocation } from "./UserLocation";


const LocationInfo = ({ placeLon, placeLat }) => {
  const queryClient = new QueryClient();
  // const userLocation = useUserLocation();
  const { user } = useContext(UserContext);
  const userLocation = {
    latitude: user?.location?.coordinates[1] || 0,
    longitude: user?.location?.coordinates[0] || 0,
  };
  const theme = useTheme(); // Get the currently active theme
  return (
    <QueryClientProvider client={queryClient}>
      <LocationInfoContent
        placeLon={placeLon}
        placeLat={placeLat}
        userLocation={userLocation}
      />
    </QueryClientProvider>
  );
};

const LocationInfoContent = ({ placeLon, placeLat, userLocation }) => {
  const { data: locationDetails } = useQuery({
    queryKey: ["location", placeLon, placeLat],
    queryFn: () => getLocationAddress(placeLon, placeLat),
    enabled: !!placeLon && !!placeLat,
  });

  const openMap = (latitude, longitude) => {
    const url = `http://maps.google.com/maps?q=${latitude},${longitude}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.error("Don't know how to open URI: " + url);
      }
    });
  };
  let distance = 0;

  if (userLocation) {
    distance = CalculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      parseFloat(placeLat),
      parseFloat(placeLon)
    );

    distance = distance.toFixed(1);
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openMap(placeLat, placeLon)}>
        <View>
          <Text style={styles.city}>
            {locationDetails
              ? `${locationDetails?.city}`
              : "No location provided"}
          </Text>
        </View>
        <View style={styles.distanceContainer}>
          <Ionicons name="location-sharp" size={24} color="#f67262" />
          <Text style={styles.textStyle}>{`${
            distance ? `${distance} km` : "Calculating..."
          }`}</Text>
        </View>

//   // if (!locationDetails) {
//   //   return <Text style={styles.textStyle}>Loading...</Text>;
//   // }
//   const theme = useTheme(); // Get the currently active theme
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => openMap(placeLat, placeLon)}>
//         <Text style={{ color: theme.colors.text }}>{`Distance: ${
//           distance ? `${distance} km` : "Calculating..."
//         }`}</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  city: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
  },

});

export default LocationInfo;
