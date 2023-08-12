import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BASE_URL } from "../../../apis";

const MyCheckInHistory = ({ history, refetch, isFetching }) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {history.map((item) => (
        <View
          key={item._id}
          style={{
            flexDirection: "row",
            margin: 10,
            height: 130,
          }}
        >
          <View
            style={{
              width: "45%",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: `${BASE_URL}/${item?.place?.image}` }}
              style={{ height: "100%", width: "100%", backgroundColor: "gray" }}
            />
          </View>
          <View
            style={{
              width: "55%",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
              {item.place.name},
            </Text>
            <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
              {item.createdAt.slice(0, 10)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyCheckInHistory;

const styles = StyleSheet.create({});
