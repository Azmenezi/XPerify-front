import { Pressable, Text, View } from "react-native";
import React from "react";
import ROUTES from "../../navigation";

export default function DmButton({ navigation }) {
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.DM)}
      >
        <Text>DmButton</Text>
      </Pressable>
    </View>
  );
}
