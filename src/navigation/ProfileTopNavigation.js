import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ROUTES from ".";
import MyPost from "../screens/Profile/ProfileDetails/MyPost";
import MyCheckInHistory from "../screens/Profile/ProfileDetails/MyCheckInHistory";

const Tab = createMaterialTopTabNavigator();

function ProfileTopNavigation() {
  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYPOST}
        component={MyPost}
        options={{ title: "Posts" }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYCHECKINHISTORY}
        component={MyCheckInHistory}
        options={{ title: "History" }}
      />
    </Tab.Navigator>
  );
}

export default ProfileTopNavigation;
