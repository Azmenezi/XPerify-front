import {
  Image,
  Animated,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { BASE_URL } from "../../../apis";
import { BlurView } from "expo-blur";

export default function ProfileImage({ route, navigation }) {
  const { profileImage } = route.params;

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 80,
          backgroundColor: "#f3f4f6",
          borderTopColor: "#252c79",
          borderTopWidth: 0.2,
        },
      });
  }, [navigation]);

  const { width, height } = useWindowDimensions();
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedStyle = {
    width: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [200, width], // Expand to full width
    }),
    height: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [200, height], // Expand to full height
    }),
  };

  return (
    <Pressable
      style={{ flex: 1, backgroundColor: "#00000099" }}
      onPress={() => navigation.pop()}
    >
      <Animated.View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
          animatedStyle,
        ]}
      >
        <BlurView
          intensity={100}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: width * 0.6, // You can adjust this value as needed
              height: width * 0.6,
              borderRadius: 200,
              overflow: "hidden",
              backgroundColor: "lightgray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 50 }}
              source={{ uri: `${BASE_URL}/${profileImage}` }}
            />
          </View>
        </BlurView>
      </Animated.View>
    </Pressable>
  );
}
