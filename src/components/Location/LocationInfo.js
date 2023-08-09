import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from "react-native"; // import StyleSheet
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { getLocationAddress } from "../../apis/location";
import { CalculateDistance } from "./CalculateDistance";
import { useUserLocation } from "./UserLocation";

const LocationInfo = ({ placeLon, placeLat }) => {
  const queryClient = new QueryClient();
  const userLocation = useUserLocation();

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

  let distance;
  if (userLocation && locationDetails) {
    distance = CalculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      parseFloat(placeLat),
      parseFloat(placeLon)
    );
    distance = distance.toFixed(1);
  }

  if (!locationDetails) {
    return <Text style={styles.textStyle}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openMap(placeLat, placeLon)}>
        <Text style={styles.textStyle}>{`Distance: ${
          distance ? `${distance} km` : "Calculating..."
        }`}</Text>
      </TouchableOpacity>

      {/* Displaying user's current latitude and longitude */}
      {/* <View>
        {userLocation && (
          <>
            <Text
              style={styles.textStyle}
            >{` Latitude: ${userLocation.latitude}`}</Text>
            <Text
              style={styles.textStyle}
            >{` Longitude: ${userLocation.longitude}`}</Text>
          </>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textStyle: {
    color: "white",
  },
});

export default LocationInfo;
