import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CheckIn from "../screens/CheckIn/CheckIn";
import Home from "../screens/Home/Home";
import MeetUp from "../screens/MeetUp/MeetUp";
import Notification from "../screens/Notification/Notification";
import Profile from "../screens/Profile/Profile";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ROUTES from ".";
import ProfileStackNavigstion from "./ProfileStackNavigstion";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E38036",
        inactiveTintColor: "black",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="md-home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.MEETUP}
        component={MeetUp}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-friends" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.CHECKIN}
        component={CheckIn}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="location" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.NOTIFICATION}
        component={Notification}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.STACK}
        component={ProfileStackNavigstion}
        options={{
          title: ROUTES.HEDERROUTES.PROFILE_STACK.PROFILE,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
