import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import Home from "../screens/Home/Home";
import PlaceDetails from "../screens/Home/PlaceDetails/PlaceDetails";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useContext, useEffect } from "react";
import Constants from "expo-constants";
import { registerForPushNotificationsAsync } from "../utils/notifications";
import { useMutation } from "@tanstack/react-query";
import { addNotificationToken } from "../apis/auth";
import UserProfile from "../screens/Profile/UserProfile";
import UserContext from "../context/UserContext";

const Stack = createStackNavigator();

function PlaceStackNavigation() {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { mutate: addToken } = useMutation({
    mutationFn: (token) => addNotificationToken(token),
  });
  const getNotificationToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      // update the user with this token
      addToken(token.data);
    }
  };
  useEffect(() => {
    getNotificationToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.HOME}
        component={Home}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS}
        component={PlaceDetails}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PROFILE}
        component={UserProfile}
      />
    </Stack.Navigator>
  );
}
export default PlaceStackNavigation;
