import { Button, Pressable, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile/Profile";
import ROUTES from ".";
import DM from "../screens/Profile/DM";
import Friends from "../screens/Profile/Friends";
import { useNavigation, useTheme } from "@react-navigation/native";
import { removeToken } from "../apis/auth/storage";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import DmChat from "../screens/Profile/DmChat";
import MyFriends from "../screens/Profile/MyFriends";
import UserProfile from "../screens/Profile/UserProfile";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "react-native-vector-icons/";
import DmButton from "../components/Profile/DmButton";
import ProfileImage from "../screens/Profile/ProfileDetails/ProfileImage";

const Stack = createStackNavigator();

export default function ProfileStackNavigstion() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.PROFILE}
        component={Profile}
        options={{
          title: user?.username,
          headerRight: () => {
            return (
              <>
                <View
                  style={{ marginRight: 20, flexDirection: "row", gap: 20 }}
                >
                  <DmButton navigation={navigation} />
                  <Pressable
                    onPress={() => {
                      removeToken();
                      setUser(null);
                    }}
                  >
                    <Icon name="sign-out" size={26} color={theme.colors.text} />
                  </Pressable>
                </View>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.MY_FRIENDS}
        component={MyFriends}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.USER_PROFILE}
        component={UserProfile}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.DM}
        component={DM}
        options={{
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.FRIENDS);
                }}
              >
                <Ionicons
                  name="people-outline"
                  size={26}
                  color={theme.colors.text}
                  style={{ marginRight: 20 }}
                />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.IMAGE}
        component={ProfileImage}
        options={{ presentation: "transparentModal", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.FRIENDS}
        component={Friends}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.DM_CHAT}
        component={DmChat}
      />
    </Stack.Navigator>
  );
}
