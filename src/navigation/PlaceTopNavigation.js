import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicChat from "../screens/Home/PlaceDetails/PublicChat";
import Posts from "../screens/Home/PlaceDetails/Posts";
import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function PlaceTopNavigations({ _id, navigation, setIsPlace }) {
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={({ navigation, route }) => {
        if (
          route.name === ROUTES.HEDERROUTES.PLACE_STACK.PUBLIC_CHAT &&
          navigation.isFocused()
        ) {
          setIsPlace(false);
        } else {
          setIsPlace(true);
        }
      }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.POSTS}
        children={() => <Posts _id={_id} navigation={navigation} />}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PUBLIC_CHAT}
        children={() => <PublicChat _id={_id} navigation={navigation} />}
      />
    </Tab.Navigator>
  );
}

export default PlaceTopNavigations;
