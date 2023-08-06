import { NavigationContainer } from "@react-navigation/native";
import { LogBox, StyleSheet, View } from "react-native";
import BottomNavigation from "./src/navigation/BottomNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { getToken } from "./src/apis/auth/storage";
import jwt_decode from "jwt-decode";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const DarkTheme = {
  dark: true,
  colors: {
    primary: "#1C535A",
    background: "#2D2F35",
    card: "transparent",
    text: "#F8F8F8",
    inputText: "#FFFFFF", // Text color for text inputs
    inputBackground: "#1c1c1c", // Background color for text inputs
    inputPlaceholder: "#FFFFFF40", // Color for input placeholders
    popMenu: "#1c1c1c",

    // border: "#ffffff",
    notification: "rgb(255, 69, 58)",
    GradientColors: ["#000000", "#1C535A"],
  },
};
const LightTheme = {
  dark: false,
  colors: {
    primary: "#40E0D0",
    background: "#F8F8F8",
    card: "#F8F8F8",
    text: "black",

    border: "#000000",
    notification: "rgb(255, 69, 58)",
    inputText: "red", // Text color for text inputs
    inputBackground: "#EAEAEA", // Background color for text inputs
    inputPlaceholder: "#00000080", // Color for input placeholders
    popMenu: "#F8F8F8",
    GradientColors: ["rgba(255, 255, 255, 0.00)", "#1C535A"],
  },
};

export default function App() {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const decodeUser = jwt_decode(token);
      setUser(decodeUser);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        {/* <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}> */}
        <NavigationContainer theme={DarkTheme}>
          {user ? <BottomNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
