import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import BottomNavigation from "./src/navigation/BottomNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { getToken } from "./src/apis/auth/storage";
import jwt_decode from "jwt-decode";
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
        <NavigationContainer>
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
