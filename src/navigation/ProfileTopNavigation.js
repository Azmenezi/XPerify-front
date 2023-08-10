import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function PlaceTopNavigations({ _id, navigation, setIsPlace }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default PlaceTopNavigations;
