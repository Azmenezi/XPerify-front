import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
