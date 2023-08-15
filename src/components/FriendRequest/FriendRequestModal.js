import React, { useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import UserContext from "../../context/UserContext";
import { BASE_URL } from "../../apis";
import { useTheme } from "@react-navigation/native";

export default function FriendRequestModal({
  onAccept,
  onDecline,
  friendRequest,
  index,
}) {
  const { user } = useContext(UserContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme(); // Get the currently active theme
  useEffect(() => {
    if (true) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, index]);

  return user._id === friendRequest.from._id ? (
    <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
      <View style={styles.modalView}>
        <Image
          style={styles.profilePic}
          source={{ uri: BASE_URL + "/" + friendRequest.to.image }}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: theme.colors.whiteText,
            }}
          >
            {friendRequest.to.username}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: theme.colors.whiteText,
            }}
          >
            friend request is pending...
          </Text>
        </View>
      </View>
    </Animated.View>
  ) : (
    <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
      <View style={styles.modalView}>
        <Image
          style={styles.profilePic}
          source={{ uri: BASE_URL + "/" + friendRequest.from.image }}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: theme.colors.text,
            }}
          >
            {friendRequest.from.username}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: theme.colors.text,
            }}
          >
            sent a friend request
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              width: 80,
              backgroundColor: "ghostwhite",
              borderRadius: 10,
            }}
          >
            <Button
              title="Accept"
              color={theme.colors.text}
              onPress={onAccept}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 40,
              width: 50,
              backgroundColor: "ghostwhite",
              borderRadius: 10,
            }}
          >
            <Button title="✗" color={theme.colors.text} onPress={onDecline} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 3,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 1,
  },
  modalView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: "gray",
    marginVertical: 60,
    borderRadius: 25,
    padding: 10,
    marginBottom: 0,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  textContainer: {
    flex: 2,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
