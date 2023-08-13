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

export default function FriendRequestModal({
  onAccept,
  onDecline,
  friendRequest,
  index,
}) {
  const { user } = useContext(UserContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
          <Text style={styles.requestText}>{friendRequest.to.username}</Text>
          <Text style={styles.smallText}>friend request is pending...</Text>
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
          <Text style={styles.requestText}>{friendRequest.from.username}</Text>
          <Text style={styles.smallText}>sent a friend request</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              width: 80,
              backgroundColor: "#5BA199",
              borderRadius: 10,
            }}
          >
            <Button title="Accept" color="white" onPress={onAccept} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 40,
              width: 50,
              backgroundColor: "gray",
              borderRadius: 10,
            }}
          >
            <Button title="✗" color="white" onPress={onDecline} />
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
    backgroundColor: "#141519",
    marginBottom: 1,
  },
  modalView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5BA19920",

    padding: 10,
    marginBottom: 0,
    shadowColor: "#000",
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
  requestText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  smallText: {
    fontSize: 15,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
