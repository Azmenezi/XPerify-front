import * as Location from "expo-location";

const fetchUserLocation = async () => {
  let locationData = { latitude: null, longitude: null, granted: false };

  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return locationData;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  return {
    latitude,
    longitude,
    granted: true,
  };
};

export default fetchUserLocation;
