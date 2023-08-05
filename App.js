import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import BottomNavigation from "./src/navigation/BottomNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
