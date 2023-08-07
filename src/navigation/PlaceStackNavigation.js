import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import Home from "../screens/Home/Home";
import PlaceDetails from "../screens/Home/PlaceDetails/PlaceDetails";

const Stack = createStackNavigator();

function PlaceStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.HOME}
        component={Home}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS}
        component={PlaceDetails}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default PlaceStackNavigation;
