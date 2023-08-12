import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPost from "../screens/Profile/ProfileDetails/MyPost";
import MyCheckInHistory from "../screens/Profile/ProfileDetails/MyCheckInHistory";
import ROUTES from ".";

const Tab = createMaterialTopTabNavigator();

function ProfileTopNavigation({ posts, history, refetch, isFetching }) {
  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYPOST}
        children={() => (
          <MyPost posts={posts} refetch={refetch} isFetching={isFetching} />
        )}
        options={{ title: "Posts" }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MYCHECKINHISTORY}
        children={() => (
          <MyCheckInHistory
            history={history}
            refetch={refetch}
            isFetching={isFetching}
          />
        )}
        options={{ title: "History" }}
      />
    </Tab.Navigator>
  );
}

export default ProfileTopNavigation;
