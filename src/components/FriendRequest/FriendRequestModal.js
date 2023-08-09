import React, { useRef, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, Animated } from "react-native";

export default function FriendRequestModal({
  user,
  onAccept,
  onDecline,
  index,
  isVisible,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 200,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, index, isVisible]);

  return (
    <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
      <View style={styles.modalView}>
        <Image
          style={styles.profilePic}
          source={{ uri: user.profilePicture }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.requestText}>{user.fullName}</Text>
          <Text style={styles.smallText}>sent a friend request</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ marginRight: 10 }}>
            <Button title="✓" color="green" onPress={onAccept} />
          </View>
          <View>
            <Button title="✗" color="red" onPress={onDecline} />
          </View>
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
  },
  modalView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5BA199",
    borderRadius: 15,
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
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
