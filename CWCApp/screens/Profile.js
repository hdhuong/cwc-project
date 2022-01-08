import React, { useEffect, useState } from "react";
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
import { Divider } from "../styles/NewsFeedStyles";
const ProfileScreen = ({ route, navigation }) => {
  const user = route?.params?.user;
  const [listPost, setListPost] = useState([]);
  const senderId = route?.params?.currentUserId;
  const receiverId = route?.params?.userId;
  useEffect(() => {
    const getListPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts/author/${user._id}`);
        setListPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListPost();
  }, []);
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
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>
              {listPost?.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>Bài viết</Text>
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
            <Text style={[styles.text, styles.subText]}>Người theo dõi</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Đang theo dõi</Text>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {listPost?.map((item) => (
              <View style={styles.mediaImageContainer} key={item?._id}>
                <Image
                  source={
                    item.img
                      ? { uri: item.img }
                      : {
                          uri: "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
                        }
                  }
                  style={styles.image}
                  resizeMode="cover"
                ></Image>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            borderRadius: 20,
            height: 200,
            backgroundColor: "#fff",
            marginLeft: 10,
            marginRight: 10,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
          }}
        >
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
            }}
          >
            <Text>Cập nhật thông tin</Text>
            <View>
              <Feather
                name="chevron-right"
                size={20}
                style={{ marginRight: 10 }}
              />
            </View>
          </View>
          <Divider />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
            }}
          >
            <Text>Đổi ảnh đại điện</Text>
            <View>
              <Feather
                name="chevron-right"
                size={20}
                style={{ marginRight: 10 }}
              />
            </View>
          </View>
          <Divider />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
            }}
          >
            <Text>Thoát</Text>
            <View>
              <Feather
                name="chevron-right"
                size={20}
                style={{ marginRight: 10 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
