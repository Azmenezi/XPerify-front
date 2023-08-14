import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import { Image } from "react-native";

import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerC({ image, setImage }) {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      // console.log("Permission denied");
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // Check if the file extension is jpg, jpeg, or png
      let fileExtension = result.uri.split(".").pop();
      if (["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
        setImage(result.uri);
      } else {
        alert("Only jpg, jpeg, or png images are allowed");
      }
    }
  };

  return (
    <View
      style={{
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "gray",
          borderRadius: 10,
          alignItems: "center",
          width: 300,
        }}
        onPress={takePhoto}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, borderRadius: 10 }}
          />
        ) : (
          <View
            style={{
              width: 300,
              height: 300,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add" size={52} color="5BA199" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
