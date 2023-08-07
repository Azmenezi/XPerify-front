import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicChat from "../screens/Home/PlaceDetails/PublicChat";
import Posts from "../screens/Home/PlaceDetails/Posts";
import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function PlaceTopNavigations() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.POSTS}
        component={Posts}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PUBLIC_CHAT}
        component={PublicChat}
      />
    </Tab.Navigator>
  );
}

export default PlaceTopNavigations;
