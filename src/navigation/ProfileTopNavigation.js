import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ROUTES from ".";
import MyPost from "../screens/Profile/ProfileDetails/MyPost";
import MyCheckInHistory from "../screens/Profile/ProfileDetails/MyCheckInHistory";

const Tab = createMaterialTopTabNavigator();

function ProfileTopNavigation({ posts, history }) {
  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYPOST}
        children={() => <MyPost posts={posts} />}
        options={{ title: "Posts" }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYCHECKINHISTORY}
        children={() => <MyCheckInHistory history={history} />}
        options={{ title: "History" }}
      />
    </Tab.Navigator>
  );
}

export default ProfileTopNavigation;
