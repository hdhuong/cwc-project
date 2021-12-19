import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/MessagesStyles";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import axios from "axios";

const MessagesScreen = ({ navigation, route }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [friend, setFriend] = useState(null);
  const [listUser, setListUser] = useState([]);
  const user = route?.params;
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
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/conversations/${user._id}`);
        setConversations(res.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  const friends = conversations?.map((x) =>
    x?.members?.find((i) => i !== user._id)
  );

  const data = listUser?.filter((x) => friends?.includes(x.userId));
  return (
    <Container>
      <Text style={{ marginTop: 40, fontSize: 18, fontFamily: "Roboto-Bold" }}>
        Tin nhắn
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("Chat", {
                friendId: item.userId,
                profilePicture: item.profilePicture,
                currentUserId: user._id,
              })
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg
                  source={
                    item.profilePicture
                      ? { uri: item.profilePicture }
                      : {
                          uri: "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
                        }
                  }
                />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.licensePlate}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
