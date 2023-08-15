import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../../apis";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "../../navigation";

import LocationInfo from "../Location/LocationInfo";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import DistanceCard from "../Location/DistanceCard";

const PlaceCard = ({ place }) => {
  const routName = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        routName.name === ROUTES.HEDERROUTES.PLACE_STACK.HOME
          ? navigation.push(
              ROUTES.HEDERROUTES.PLACE_STACK.PLACEDETAILS,
              {
                _id: place._id,
                posts: place.posts,
              },
              (key = { _id: place._id })
            )
          : navigation.navigate(ROUTES.HEDERROUTES.CHECKIN_STACK.POST, {
              _id: place._id,
            });
      }}
    >
      <View
        style={{
          flexDirection: "column",
          margin: 20,
          borderRadius: 13,
          overflow: "hidden",
          width: "90%",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            height: 200,
            width: "100%",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: `${BASE_URL}/${place.image}` }}
            style={{
              width: "100%",
              resizeMode: "contain",
              height: "100%",
              resizeMode: "cover",
            }}
            resizeMode="cover"
          />

          {/* Inserted DistanceCard component here */}
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <DistanceCard
              placeLon={place?.location?.coordinates[0]}
              placeLat={place?.location?.coordinates[1]}
            />
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 5,
            }}
          >
            <>
              {place?.amenities[0] && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    name={place?.amenities[0]?.icon}
                    size={20}
                    color={theme.colors.text}
                    style={{ margin: 3 }}
                  />
                </View>
              )}
              {place?.amenities[1] && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    name={place?.amenities[1]?.icon}
                    size={20}
                    color={theme.colors.text}
                    style={{ margin: 3 }}
                  />
                </View>
              )}
              {place?.amenities[2] && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    name={place?.amenities[2]?.icon}
                    size={20}
                    color={theme.colors.text}
                    style={{ margin: 3 }}
                  />
                </View>
              )}
              {place?.amenities[3] && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    name={place?.amenities[3]?.icon}
                    size={20}
                    color={theme.colors.text}
                    style={{ margin: 3 }}
                  />
                </View>
              )}
            </>
          </View>
        </View>
        <View
          style={{
            height: 78,
            padding: 12,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            paddingHorizontal: 15,
          }}
        >
          <View style={{ width: "60%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#182039",
                marginBottom: 8,
                marginLeft: 5,
              }}
            >
              {place.name}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "",
                }}
              >
                <LocationInfo
                  placeLon={place?.location?.coordinates[0]}
                  placeLat={place?.location?.coordinates[1]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceCard;
