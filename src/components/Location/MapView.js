import React from "react";
import MapViewComponent, { Marker } from "react-native-maps";

const MapView = ({ userLocation, placeLocation }) => {
  return (
    <MapViewComponent
      style={{ flex: 1 }}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={userLocation} title="Your Location" />
      <Marker coordinate={placeLocation} title="Place Location" />
    </MapViewComponent>
  );
};

export default MapView;
