import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import PublicChatComponent from "../../../components/Chat/PublicChatComponent";

export default function PublicChat({ _id, navigation }) {
  return <PublicChatComponent _id={_id} navigation={navigation} />;
}

const styles = StyleSheet.create({});
