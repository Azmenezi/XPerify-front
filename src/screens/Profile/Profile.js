import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DmButton from "../../components/Profile/DmButton";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileTopNavigations from "../../navigation/ProfileTopNavigation";
const Profile = ({ navigation }) => {
  return (
    <View>
      {/* <DmButton navigation={navigation} /> */}

      <ProfileTopNavigations />

      {/* <ProfileInfo /> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
