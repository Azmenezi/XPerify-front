import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import { Image } from "react-native";

import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImagePickerC({ image, setImage }) {
  useEffect(() => {
    requestImagePickerPermission();
  }, []);

  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images
      allowsEditing: true,
      aspect: [1, 1], // changed to create a square
      quality: 1,
    });

    if (!result.canceled) {
      // Get the file extension
      let fileExtension = result.assets[0].uri.split(".").pop();

      // Check if the file extension is jpg, jpeg, or png
      if (["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
        setImage(result.assets[0].uri);
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
        onPress={pickImage}
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
