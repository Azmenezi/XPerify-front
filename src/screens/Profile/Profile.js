import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DmButton from "../../components/Profile/DmButton";
import ProfileInfo from "../../components/Profile/ProfileInfo";

const Profile = ({ navigation }) => {
  return (
    <View>
      <DmButton navigation={navigation} />
      {/* <ProfileInfo /> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
