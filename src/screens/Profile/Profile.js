import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import DmButton from "../../components/Profile/DmButton";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileTopNavigation from "../../navigation/ProfileTopNavigation";
import { getMyProfile } from "../../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../apis";
import MoodContext from "../../context/MoodContext";

const Profile = ({ navigation }) => {
  const { data: profile } = useQuery(["profile"], () => getMyProfile());
  const { selectedMood } = useContext(MoodContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 140, flexDirection: "row" }}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ left: 40 }}>
            <DmButton navigation={navigation} />
          </View>
          <View
            style={{
              width: 82,
              height: 82,
              borderRadius: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 80, height: 80, borderRadius: 50 }}
              source={{
                uri: `${BASE_URL}/${profile?.image}`,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "70%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "50%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 100, height: 70 }}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Freinds
              </Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "gray",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 20 }}
                >
                  {profile?.friends.length}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 100, height: 70 }}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Mood
              </Text>
              <View
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "gray",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 20 }}
                >
                  {selectedMood ? selectedMood : "None"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ProfileTopNavigation history={profile?.history} posts={profile?.posts} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
