import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPost from "../screens/Profile/ProfileDetails/MyPost";
import MyCheckInHistory from "../screens/Profile/ProfileDetails/MyCheckInHistory";
import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function PlaceTopNavigations({ _id, navigation, setIsPlace }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYPOST}
        component={MyPost}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYCHECKINHISTORY}
        component={MyCheckInHistory}
      />
    </Tab.Navigator>
  );
}

export default PlaceTopNavigations;
