import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileTopNavigation from "../../navigation/ProfileTopNavigation";
import { getMyProfile } from "../../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../apis";
import ROUTES from "../../navigation";
import { useTheme } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const Profile = ({ navigation }) => {
  const {
    data: profile,
    isFetching,
    refetch,
    isLoading,
  } = useQuery(["profile"], () => getMyProfile());
  const theme = useTheme(); // Get the currently active theme
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 140, flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            top: -10,
          }}
        >
          <Pressable
            onLongPress={() => {
              navigation.navigate(ROUTES.HEDERROUTES.PROFILE_STACK.IMAGE, {
                profileImage: profile?.image,
              });
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            delayLongPress={100}
            style={{
              width: 82,
              height: 82,
              borderRadius: 50,
              // backgroundColor: theme.colors.text,
              backgroundColor: "lightgray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{
                uri: `${BASE_URL}/${profile?.image}`,
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            width: "40%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 100, height: 70 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Friends
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate(
                    ROUTES.HEDERROUTES.PROFILE_STACK.MY_FRIENDS
                  );
                }}
                style={{
                  width: 100,
                  height: 40,
                  // backgroundColor: "ghostwhite",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {profile?.friends.length}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <ProfileTopNavigation
        history={profile?.history}
        posts={profile?.posts}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
