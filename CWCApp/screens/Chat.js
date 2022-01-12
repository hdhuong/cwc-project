import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import { io } from "socket.io-client";
const ChatScreen = ({ route, navigation }) => {
  const currentUserId = route?.params?.currentUserId;
  const secondUserId = route?.params?.friendId;
  const [messages, setMessages] = useState([]);
  const [secondUser, setSecondUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      secondUserId === arrivalMessage.sender &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    const getSecondUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${secondUserId}`);
        setSecondUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSecondUser();
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/conversations/find/${currentUserId}/${secondUserId}`
        );
        setConversation(res.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, []);
  const conversationId = conversation?._id;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getMessages = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/api/messages/${conversationId}`
          );
          setMessages(res.data.messages.reverse());
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [conversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/messages/${conversationId}`
        );
        setMessages(res.data.messages.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversation]);

  const onSend = async (messages) => {
    const params = {
      sender: currentUserId,
      text: messages[0]?.text,
      conversationId: conversationId,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: secondUserId,
      text: messages[0]?.text,
    });

    try {
      const res = await axios.post(`${API_URL}/api/messages`, params);
      appendMessages(res.data.savedMessage);
    } catch (err) {
      console.log(err);
    }
  };
  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const dataTest = messages?.map((x) => ({
    ...x,
    user: {
      _id: x.sender === currentUserId ? 1 : 2,
      avatar:
        x.sender === currentUserId
          ? null
          : secondUser.profilePicture
          ? seconUser.profilePicture
          : "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png",
    },
  }));

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Messages");
          }}
        >
          <View>
            <Feather name="arrow-left" size={20} style={{ marginRight: 10 }} />
          </View>
        </TouchableOpacity>
        <Text>Cuộc trò chuyện với {secondUser?.licensePlate}</Text>
      </View>

      <GiftedChat
        messages={dataTest}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
