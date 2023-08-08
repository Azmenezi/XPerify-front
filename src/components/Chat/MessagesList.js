import React from "react";
import moment from "moment";
import MessageBubble from "./MessageBubble";
import RecievedMsgBubble from "./RecievedMsgBubble";
import { Text, View } from "react-native";

export default function MessagesList({ user, data }) {
  const uniqueDays = {};
  const dayElements = [];

  data?.msgs.forEach((msg) => {
    const day = moment(msg.createdAt).format("MMM Do YY");

    if (!uniqueDays[day]) {
      uniqueDays[day] = true;
      dayElements.push(
        <Text
          key={`day-${day}`}
          style={{
            color: "grey",
            textAlign: "center",
          }}
        >
          {day}
        </Text>
      );
    }

    if (msg.from._id === user._id) {
      dayElements.push(<MessageBubble key={msg._id} msg={msg} />);
    } else {
      dayElements.push(<RecievedMsgBubble key={msg._id} msg={msg} />);
    }
  });

  return <View style={{ flex: 1 }}>{dayElements}</View>;
}
