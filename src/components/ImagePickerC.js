import { View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
        {image ? (
          <Image source={{ uri: image }} style={styles.selectedImage} />
        ) : (
          <View style={styles.iconContainer}>
            <Ionicons name="add" size={60} color="#202124" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  imagePicker: {
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // width: 300,
    // height: 300,
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  // iconContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
};

// import React, { useEffect } from "react";
// import { View, TouchableOpacity, Image, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";

// export default function ImagePickerC({ image, setImage }) {
//   useEffect(() => {
//     requestCameraPermission();
//     requestLibraryPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       alert("Permission for camera is required for this feature.");
//     }
//   };

//   const requestLibraryPermission = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("Permission for media library is required for this feature.");
//     }
//   };

//   const takePhoto = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const pickImageFromLibrary = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       let fileExtension = result.uri.split(".").pop();
//       if (["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
//         setImage(result.uri);
//       } else {
//         alert("Only jpg, jpeg, or png images are allowed");
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.selectedImage} />
//         ) : (
//           <View style={styles.iconContainer}>
//             <Ionicons name="add" size={60} color="#202124" />
//           </View>
//         )}
//       </TouchableOpacity>
//       <TouchableOpacity onPress={pickImageFromLibrary}>
//         <Text>Select from Library</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = {
//   container: {
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   imagePicker: {
//     backgroundColor: "#E5E5E5",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   selectedImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
//   iconContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };
