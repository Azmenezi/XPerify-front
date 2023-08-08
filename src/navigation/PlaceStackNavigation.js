import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import Home from "../screens/Home/Home";
import PlaceDetails from "../screens/Home/PlaceDetails/PlaceDetails";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
const Stack = createStackNavigator();

function PlaceStackNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.HOME}
        component={Home}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS}
        component={PlaceDetails}
      />
    </Stack.Navigator>
  );
}
export default PlaceStackNavigation;
