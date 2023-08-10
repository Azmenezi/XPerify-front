import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ImagePickerC from "../../components/ImagePickerC";
import { checkIn } from "../../apis/places";
// import AmenitiesList2 from "../../components/Amenity/AmenityList2";


const Post = ({ navigation, route }) => {
    const { _id } = route.params
    const queryClient = useQueryClient();
    const [data, setData] = useState({});
    const [image, setImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    console.log(data)
    const { mutate: createPostFun } = useMutation({
        mutationFn: () =>
            checkIn({
                ...data,
                place: _id, image: image
            }),
        onSuccess: () => {

            setData({});
            setImage(null);

            queryClient.invalidateQueries(["posts"]);
            // navigation.navigate();
            setIsModalVisible(false);

        },
    });
    const handleCheckin = () => {

        setIsModalVisible(true);
        // createPostFun();



    };
    const closeModal = () => {
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
                    <ImagePickerC
                        image={image}
                        setImage={setImage}
                        style={styles.image}
                        onImagePicked={(imageUri) =>
                            setData({ ...data, image: imageUri })
                        }
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ color: "grey" }}>
                                Tap to select an image
                            </Text>
                        </View>
                    </ImagePickerC>



                    <View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={handleCheckin}
                        >
                            <Text style={styles.buttonText}>Checkin</Text>
                        </TouchableOpacity>

                        <Modal visible={isModalVisible} animationType="slide"

                            presentationStyle="overFullScreen" >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>

                                    <Image source={{ uri: data.image }} style={styles.modalImage} />
                                    <Pressable style={styles.skipButton} onPress={closeModal}>
                                        <Text style={styles.skipButtonText}>Skip</Text>
                                    </Pressable>
                                    {/* <AmenitiesList2 onRateAmenity={(amenityName, rating) => console.log(amenityName, rating)} /> */}

                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Post

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
    image: {
        width: 360,
        height: 250,
        borderRadius: 15,
        marginBottom: 20,

        resizeMode: "cover",
        borderRadius: 7,
        borderColor: "#D3D3D3",
        borderWidth: 1,
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
    }, modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Backdrop color
    }, modalView: {
        width: "100%",
        height: "65%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // backgroundColor: "white", // Content background color
        alignItems: "center",
    },
})













