import React, { useEffect, useState } from "react";
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
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import PostCard from "../components/PostCard";

import { Container } from "../styles/NewsFeedStyles";

const Posts = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-3.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/images/home_banner.jpg"),
    liked: true,
    likes: "14",
    comments: "5",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-1.jpg"),
    postTime: "2 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "8",
    comments: "0",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    postTime: "1 hours ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/images/home_banner.jpg"),
    liked: true,
    likes: "1",
    comments: "0",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    postTime: "1 day ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/images/home_banner.jpg"),
    liked: true,
    likes: "22",
    comments: "4",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    postTime: "2 days ago",
    post: "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "0",
    comments: "0",
  },
];

const NewsFeedScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const ListHeader = () => {
    return null;
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
                    "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
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
          <FlatList
            data={Posts}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                // onDelete={handleDelete}
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
