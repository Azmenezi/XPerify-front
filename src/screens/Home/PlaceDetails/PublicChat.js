import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import PublicChatComponent from "../../../components/Chat/PublicChatComponent";
import { useFocusEffect } from "@react-navigation/native";

export default function PublicChat({ _id, navigation, setIsPlace, isPlace }) {
  useFocusEffect(
    React.useCallback(() => {
      setIsPlace(false);
    }, [])
  );

  return <PublicChatComponent _id={_id} navigation={navigation} />;
}

const styles = StyleSheet.create({});
