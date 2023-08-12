import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  console.log(userLocation);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [userLocation?.latitude, userLocation?.longitude]);

  return userLocation;
};
