import { Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile/Profile";
import ROUTES from ".";
import DM from "../screens/Profile/DM";
import Friends from "../screens/Profile/Friends";
import { useNavigation } from "@react-navigation/native";
import { removeToken } from "../apis/auth/storage";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import DmChat from "../screens/Profile/DmChat";
const Stack = createStackNavigator();
export default function ProfileStackNavigstion() {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.PROFILE}
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <Button
                title="Logout"
                onPress={() => {
                  removeToken();
                  setUser(null);
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.PROFILE_STACK.DM}
        component={DM}
        options={{
          headerRight: (props) => {
            return (
              <Button
                title="Friends"
                onPress={() => {
                  navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.FRIENDS);
                }}
              />
            );
          },
        }}
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
