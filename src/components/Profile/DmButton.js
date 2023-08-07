import { Pressable, Text, View } from "react-native";
import React from "react";
import ROUTES from "../../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function DmButton({ navigation }) {
  const theme = useTheme(); // Get the currently active theme
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM)}
      >
        <MaterialCommunityIcons
          name="message-badge"
          size={24}
          color={theme.colors.text}
        />
      </Pressable>
    </View>
  );
}
