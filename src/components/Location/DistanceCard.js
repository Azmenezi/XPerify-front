import React, { useContext } from "react";
import { Text, StyleSheet, View, Linking } from "react-native";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { getLocationAddress } from "../../apis/location";
import UserContext from "../../context/UserContext";
import { CalculateDistance } from "./CalculateDistance";

import { useTheme } from "@react-navigation/native";
// import { useUserLocation } from "./UserLocation";

const DistanceCard = ({ placeLon, placeLat }) => {
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
      <View style={styles.distanceContainer}>
        <Text style={styles.textStyle}>
          {distance ? `${distance} km` : "Calculating..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginRight: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  textStyle: {
    color: "black",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DistanceCard;
