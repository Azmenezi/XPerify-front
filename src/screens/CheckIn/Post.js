import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImagePickerC from "../../components/ImagePickerC";
import { checkIn } from "../../apis/places";
import { getAllAmenities } from "../../apis/amenity";
import { getAllMood } from "../../apis/mood";
import { useTheme } from "@react-navigation/native";
import MoodCardSelecter from "../../components/Mood/MoodCardSelecter";
import AmenitiesCardSelecter from "../../components/Amenity/AmenitiesCardSelecter copy";

const Post = ({ navigation, route }) => {
  const { _id } = route.params;
  const queryClient = useQueryClient();
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: amenities } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => getAllAmenities(),
  });
  const { data: moods } = useQuery({
    queryKey: ["moods"],
    queryFn: () => getAllMood(),
  });

  const { mutate: createPostFun } = useMutation({
    mutationFn: () => {
      if (image) return checkIn({ ...data, place: _id, image: image });

      return checkIn({ ...data, place: _id });
    },
    onSuccess: () => {
      setImage(null);
      navigation.pop();
      queryClient.invalidateQueries(["posts"]);
      setIsModalVisible(false);
    },
  });

  const handleCheckin = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const submitModal = () => {
    setIsModalVisible(false);
    createPostFun();
  };
  const theme = useTheme(); // Get the currently active theme
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 8,
              marginTop: 15,
              alignSelf: "center",
              marginLeft: 20,
              color: theme.colors.text,
            }}
          >
            Share A Photo
          </Text>
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignContent: "center",
              padding: 20,
              backgroundColor: "#E5E5E5", // Lighter gray for image picker background
              borderRadius: 5,
            }}
          >
            <ImagePickerC
              image={image}
              setImage={setImage}
              style={styles.image}
            >
              <View style={{}}>
                <Text style={{ color: "darkgray" }}>
                  Tap here to select a photo.
                </Text>
              </View>
            </ImagePickerC>
          </View>
          <View style={{ marginTop: 50, marginLeft: 30 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              How would you describe the vibe?
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              {moods?.map((amenity, index) => (
                <MoodCardSelecter
                  key={index}
                  icon={amenity.icon}
                  name={amenity.name}
                  _id={amenity._id}
                  data={data}
                  setData={setData}
                />
              ))}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleCheckin}
            >
              <Text
                style={{
                  color: theme.colors.text2,
                  fontSize: 18,
                }}
              >
                Checkin
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              presentationStyle="overFullScreen"
              onRequestClose={closeModal}
            >
              <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.centeredView}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ color: "black", fontSize: 20 }}>
                          Available Amenities
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                          flexWrap: "wrap",
                          marginBottom: 20,
                        }}
                      >
                        {amenities?.map((amenity, index) => (
                          <AmenitiesCardSelecter
                            key={index}
                            icon={amenity.icon}
                            name={amenity.name}
                            _id={amenity._id}
                            data={data}
                            setData={setData}
                          />
                        ))}
                      </View>

                      <Pressable
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: 200,
                          backgroundColor: "#202124",
                          borderRadius: 5,
                          alignSelf: "center",
                          height: 35,
                          width: 120,
                          marginTop: 20,
                        }}
                        onPress={submitModal}
                      >
                        <Text style={{ color: "white", fontSize: 20 }}>
                          Done
                        </Text>
                      </Pressable>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252c79", // darkBlue as the primary background color
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#252c79", // secondaryBlue for primary actions
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    width: 200,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Consider revisiting this color to align with the new theme.
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
