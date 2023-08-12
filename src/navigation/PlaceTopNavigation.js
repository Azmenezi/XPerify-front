import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PublicChat from "../screens/Home/PlaceDetails/PublicChat";
import Posts from "../screens/Home/PlaceDetails/Posts";
import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function PlaceTopNavigations({ _id, navigation, setIsPlace, isPlace }) {
  return (
    <Tab.Navigator
      lazy={true}
      // screenOptions={({ navigation, route }) => {
      //   if (
      //     route.name === ROUTES.HEDERROUTES.PLACE_STACK.PUBLIC_CHAT &&
      //     navigation.isFocused()
      //   ) {
      //     console.log(`

      //     ${isPlace}
      //     I AM GOING TO FALSE

      //     `);
      //     setIsPlace(false);
      //   } else {
      //     console.log(`

      //     ${isPlace}
      //     I AM GOING TO TRUE

      //     `);
      //     setIsPlace(true);
      //   }
      // }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.POSTS}
        children={() => (
          <Posts
            _id={_id}
            navigation={navigation}
            setIsPlace={setIsPlace}
            isPlace={isPlace}
          />
        )}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.PUBLIC_CHAT}
        children={() => (
          <PublicChat
            _id={_id}
            navigation={navigation}
            setIsPlace={setIsPlace}
            isPlace={isPlace}
          />
        )}
      />
    </Tab.Navigator>
  );
}

export default PlaceTopNavigations;
