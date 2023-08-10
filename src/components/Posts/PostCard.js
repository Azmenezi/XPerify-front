import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import ROUTES from '../../navigation';

const PostCard = ({ post, place }) => {
  // console.log(post)
  // const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate(ROUTES.HEDERROUTES.POST_DETAIL, {
        //     _id: post._id,
        //   });
      }}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/${post.image}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{place.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 26,
    height: 400,
    margin: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
  },
});
