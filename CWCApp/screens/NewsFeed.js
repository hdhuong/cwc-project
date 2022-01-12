import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import axios from "axios";
import ButtonToggleGroup from "react-native-button-toggle-group";
import { showMessage, hideMessage } from "react-native-flash-message";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import PostCard from "../components/PostCard";

import { Container } from "../styles/NewsFeedStyles";

const NewsFeedScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const [posts, setPosts] = useState(null);
  const [value, setValue] = useState("Light");
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [category, setCategory] = useState(null);

  if (category) {
    useEffect(() => {
      const getListPost = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/posts/find/${category}`);
          setListPost(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getListPost();
    }, []);
  } else {
    useEffect(() => {
      const getListPost = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/posts/list`);
          setListPost(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };
      getListPost();
    }, []);
  }

  useEffect(() => {
    const getListUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/`);
        setListUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getListUser();
  }, []);

  const dataTest = listPost?.map((x, value) => ({
    ...x,
    id: value + 1,
    user: listUser?.find((i) => i.userId === x.userId),
  }));
  const Posts = dataTest?.map((item) => ({
    id: item.id,
    userName: item?.user?.licensePlate,
    userImg: item?.user?.profilePicture
      ? item.user.profilePicture
      : "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
    post: item?.desc,
    postImg: item?.img,
    postTime: moment.utc(item?.createdAt).local().startOf("seconds").fromNow(),
    liked: false,
    likes: "0",
    comments: "0",
    userId: item?.userId,
    postId: item?._id,
  }));
  const ListHeader = () => {
    return null;
  };

  const handleFilterPost = async (category) => {
    try {
      const response = await axios.get(`${API_URL}/api/posts/find/${category}`);
      if (response.data.success) navigation.navigate("NewsFeed");
      setListPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSelect = (val) => {
    switch (val) {
      case "Va chạm":
        setValue(val);
        handleFilterPost(1);
        break;
      case "Tắc đường":
        setValue(val);
        handleFilterPost(2);
        break;
      case "Chú ý":
        setValue(val);
        handleFilterPost(3);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (postId, userId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/posts/${postId}/${userId}`
      );
      if (response.data.success) navigation.navigate("NewsFeed");
      useEffect(() => {
        const getListPost = async () => {
          try {
            const res = await axios.get(`${API_URL}/api/posts/list`);
            setListPost(res.data.data);
          } catch (err) {
            console.log(err);
          }
        };
        getListPost();
      }, []);
      showMessage({
        message: "Thành công",
        description: response?.data?.message,
        type: NOTIFICATION_TYPE.SUCCESS,
      });
    } catch (error) {
      showMessage({
        message: "Thất bại",
        description: error?.response?.data?.message,
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Text>null</Text>
      ) : (
        // <ScrollView
        //   style={{ flex: 1 }}
        //   contentContainerStyle={{ alignItems: "center" }}
        // >
        //   <SkeletonPlaceholder>
        //     <View style={{ flexDirection: "row", alignItems: "center" }}>
        //       <View style={{ width: 60, height: 60, borderRadius: 50 }} />
        //       <View style={{ marginLeft: 20 }}>
        //         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
        //         <View
        //           style={{
        //             marginTop: 6,
        //             width: 80,
        //             height: 20,
        //             borderRadius: 4,
        //           }}
        //         />
        //       </View>
        //     </View>
        //     <View style={{ marginTop: 10, marginBottom: 30 }}>
        //       <View style={{ width: 300, height: 20, borderRadius: 4 }} />
        //       <View
        //         style={{
        //           marginTop: 6,
        //           width: 250,
        //           height: 20,
        //           borderRadius: 4,
        //         }}
        //       />
        //       <View
        //         style={{
        //           marginTop: 6,
        //           width: 350,
        //           height: 200,
        //           borderRadius: 4,
        //         }}
        //       />
        //     </View>
        //   </SkeletonPlaceholder>
        //   <SkeletonPlaceholder>
        //     <View style={{ flexDirection: "row", alignItems: "center" }}>
        //       <View style={{ width: 60, height: 60, borderRadius: 50 }} />
        //       <View style={{ marginLeft: 20 }}>
        //         <View style={{ width: 120, height: 20, borderRadius: 4 }} />
        //         <View
        //           style={{
        //             marginTop: 6,
        //             width: 80,
        //             height: 20,
        //             borderRadius: 4,
        //           }}
        //         />
        //       </View>
        //     </View>
        //     <View style={{ marginTop: 10, marginBottom: 30 }}>
        //       <View style={{ width: 300, height: 20, borderRadius: 4 }} />
        //       <View
        //         style={{
        //           marginTop: 6,
        //           width: 250,
        //           height: 20,
        //           borderRadius: 4,
        //         }}
        //       />
        //       <View
        //         style={{
        //           marginTop: 6,
        //           width: 350,
        //           height: 200,
        //           borderRadius: 4,
        //         }}
        //       />
        //     </View>
        //   </SkeletonPlaceholder>
        // </ScrollView>
        <Container>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 320,
              marginBottom: 5,
            }}
          >
            <Image
              source={{
                uri: user
                  ? user.profilePicture ||
                    "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
                  : "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginBottom: 8,
                marginRight: 3,
              }}
            ></Image>
            <View style={styles.action}>
              <TextInput
                placeholder="Bạn đang nghĩ gì ? "
                style={styles.textInput}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddPost");
                }}
              >
                <View>
                  <Feather
                    name="plus"
                    size={25}
                    style={{
                      marginLeft: 10,
                      marginBottom: 8,
                      color: "#3181a3",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: 360,
              marginBottom: 10,
            }}
          >
            <ButtonToggleGroup
              highlightBackgroundColor={"#22b4b7"}
              highlightTextColor={"white"}
              inactiveBackgroundColor={"transparent"}
              inactiveTextColor={"grey"}
              values={["Va chạm", "Tắc đường", "Chú ý"]}
              value={value}
              onSelect={(val) => onChangeSelect(val)}
            />
          </View>
          <FlatList
            data={Posts}
            renderItem={({ item }) => (
              <PostCard
                user={user}
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate("HomeProfile", { userId: item.userId })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export default NewsFeedScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  searchBar: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#d5dce9",
    paddingBottom: 5,
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    backgroundColor: "#f3f4f5",
    width: 250,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
