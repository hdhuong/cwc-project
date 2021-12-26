import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
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

const NewsFeedScreen = ({ navigation }) => {
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
