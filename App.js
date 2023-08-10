import { NavigationContainer } from "@react-navigation/native";
import { LogBox, SafeAreaView, StyleSheet } from "react-native";
import BottomNavigation from "./src/navigation/BottomNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { getToken, removeToken } from "./src/apis/auth/storage";
import jwt_decode from "jwt-decode";
import MoodContext from "./src/context/MoodContext";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const DarkTheme = {
  dark: true,
  colors: {
    primary: "#5BA199",
    background: "#141519",
    card: "transparent",
    text: "#E5E3E4",
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
  const [selectedMood, setSelectedMood] = useState(null);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const decodeUser = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodeUser.exp < currentTime) {
        removeToken();
        return setUser(null);
      }
      setUser(decodeUser);
    }
  };

  useEffect(() => {
    checkToken();

  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <MoodContext.Provider value={{ selectedMood, setSelectedMood }}>
          {/* <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}> */}
          <NavigationContainer theme={DarkTheme}>
            <SafeAreaView style={styles.container}>
              {user ? <BottomNavigation /> : <AuthNavigation />}
            </SafeAreaView>
          </NavigationContainer>
        </MoodContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background,
  },
});
