import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import RegisterUsername from "../screens/Auth/Register/UsernameHandler";
import RegisterPassword from "../screens/Auth/Register/PasswordHandler";
import RegisterImage from "../screens/Auth/Register/ImageHandler";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterUsername"
        component={RegisterUsername}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPassword"
        component={RegisterPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterImage"
        component={RegisterImage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
