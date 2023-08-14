import React, { useRef, useContext } from "react";
import { Animated, Image, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import CheckIn from "../screens/CheckIn/CheckIn";
import MeetUp from "../screens/MeetUp/MeetUp";
import Notification from "../screens/Notification/Notification";
import ROUTES from ".";
import ProfileStackNavigstion from "./ProfileStackNavigstion";
import PlaceStackNavigation from "./PlaceStackNavigation";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../apis";
import CheckinStack from "./CheckinStack";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const { user } = useContext(UserContext);

  const homeScale = useRef(new Animated.Value(1)).current;
  const meetupScale = useRef(new Animated.Value(1)).current;
  const checkinScale = useRef(new Animated.Value(1)).current;
  const notificationScale = useRef(new Animated.Value(1)).current;
  const profileScale = useRef(new Animated.Value(1)).current;

  const handleTabPress = (animation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#5BA199",
        tabBarInactiveTintColor: "#E5E3E4",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#141519",
          borderTopColor: "#E5E3E420",
          borderTopWidth: 0.2,
        },
        tabBarButton: (props) => {
          let animation;

          switch (route.name) {
            case ROUTES.HEDERROUTES.PLACE_STACK.STACK:
              animation = homeScale;
              break;
            case ROUTES.HEDERROUTES.MEETUP:
              animation = meetupScale;
              break;
            case ROUTES.HEDERROUTES.CHECKIN_STACK.STACK:
              animation = checkinScale;
              break;
            case ROUTES.HEDERROUTES.NOTIFICATION:
              animation = notificationScale;
              break;
            case ROUTES.HEDERROUTES.PROFILE_STACK.STACK:
              animation = profileScale;
              break;
            default:
              animation = new Animated.Value(1);
          }

          return (
            <Animated.View
              style={{ flex: 1, transform: [{ scale: animation }] }}
            >
              <TouchableOpacity
                {...props}
                onPress={() => {
                  handleTabPress(animation);
                  props.onPress();
                }}
              />
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PLACE_STACK.STACK}
        component={PlaceStackNavigation}
        options={{
          title: ROUTES.HEDERROUTES.PLACE_STACK.HOME,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="md-home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.MEETUP}
        component={MeetUp}
        options={{
          headerShown: true,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-friends" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.CHECKIN_STACK.STACK}
        component={CheckinStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="location" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.NOTIFICATION}
        component={Notification}
        options={{
          headerShown: true,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.STACK}
        component={ProfileStackNavigstion}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: color,
                padding: 1,
              }}
            >
              <Image
                source={{ uri: `${BASE_URL}/${user?.image}` }}
                style={{ height: 22, width: 22, borderRadius: 50 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
