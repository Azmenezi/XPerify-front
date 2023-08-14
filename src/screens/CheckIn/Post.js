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
import ROUTES from "../../navigation";
import AmenitiesCardSelecter from "../../components/Mood/MoodCardSelecter";
import { getAllAmenities } from "../../apis/amenity";
import { getAllMood } from "../../apis/mood";

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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.label}>
            Choose an Image to share your Experiance
          </Text>
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignContent: "center",
              padding: 20,
            }}
          >
            <ImagePickerC
              image={image}
              setImage={setImage}
              style={styles.image}
            >
              <View style={{}}>
                <Text style={{ color: "grey" }}>Tap to select an image</Text>
              </View>
            </ImagePickerC>
          </View>
          <View style={{ marginTop: 50, marginLeft: 30 }}>
            <Text style={{ color: "white" }}>
              What was the vibe of the place?
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              {moods?.map((amenity, index) => (
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
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleCheckin}
            >
              <Text style={styles.buttonText}>Checkin</Text>
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
                        }}
                      >
                        <Pressable
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 200,
                          }}
                          onPress={submitModal}
                        >
                          <Text style={{ color: "white", fontSize: 20 }}>
                            Does The Place Have?
                          </Text>
                          <Text style={{ color: "gray", fontSize: 20 }}>
                            Done
                          </Text>
                        </Pressable>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 20 }}>
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
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "lightgreen",
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    width: 200,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 12,
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Backdrop color
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
    shadowColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Matches the first modal
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
