import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { images } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import axios from "axios";
const OtherProfileScreen = ({ route, navigation }) => {
  const user = route?.params;
  const senderId = route?.params?.currentUserId;
  const receiverId = route?.params?.userId;
  const handleSendMessages = async () => {
    const params = {
      senderId: senderId,
      receiverId: receiverId,
    };
    try {
      const res1 = await axios.get(`${API_URL}/api/conversations/${user._id}`);
      if (res1.data.conversation.length === 0) {
        const res = await axios.post(`${API_URL}/api/conversations`, params);
        if (res.data.success)
          navigation.navigate("Chat", {
            currentUserId: senderId,
            friendId: receiverId,
          });
      } else {
        navigation.navigate("Chat", {
          currentUserId: senderId,
          friendId: receiverId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SearchCar");
          }}
        >
          <View>
            <Feather
              name="arrow-left"
              size={25}
              style={{ marginRight: 10, marginLeft: 10, marginTop: 20 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={
                user.profilePicture
                  ? { uri: user.profilePicture }
                  : {
                      uri: "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
                    }
              }
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { fontWeight: "200", fontSize: 36, fontFamily: "Roboto-Bold" },
            ]}
          >
            {user.licensePlate}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                handleSendMessages();
              }}
            >
              <Text style={styles.userBtnTxt}>Nhắn tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
              <Text style={styles.userBtnTxt}>Theo dõi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={images.news2}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={images.news3}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={images.news4}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
          </ScrollView>
        </View>
        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
});
