import React, { useState, useEffect, useCallback } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Picker,
} from "react-native";
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
import axios from "axios";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  API_URL,
  NOTIFICATION_TYPE,
} from "../utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showMessage, hideMessage } from "react-native-flash-message";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";

const RescueScreen = ({ route, navigation }) => {
  const user = route?.params?.user;
  const [selectedValue, setSelectedValue] = useState(1);
  const [data, setData] = useState([]);
  const handleFilterRescue = async (areaEnum) => {
    if (areaEnum) {
      try {
        const response = await axios.get(
          `${API_URL}/api/rescues/find/${areaEnum}`
        );
        if (response.data.success) setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      showMessage({
        message: "Thất bại",
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
      <Text style={{ fontSize: 18, fontFamily: "Roboto-Bold" }}>
        Tìm kiếm cứu hộ
      </Text>
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View>
            <Feather name="arrow-left" size={20} style={{ marginRight: 10 }} />
          </View>
        </TouchableOpacity>

        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          useNativeAndroidPickerStyle={false}
          value={selectedValue}
          style={pickerSelectStyles}
          items={[
            { label: "Cứu hộ TP Hà Nội", value: 1 },
            { label: "Cứu hộ TP.HCM", value: 2 },
            { label: "Cứu hộ TP Đà Nẵng", value: 3 },
          ]}
        />

        <TouchableOpacity
          onPress={() => {
            handleFilterRescue(selectedValue);
          }}
        >
          <View>
            <Feather name="search" size={20} style={{ marginLeft: 10 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }} style={styles.container2}>
        {data?.length !== 0 ? (
          <FlatList
            data={data}
            key={(item) => item._id}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => (
              <Card>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png",
                      }}
                    />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.name}</UserName>
                    </UserInfoText>
                    <MessageText>{item.phone}</MessageText>
                    <MessageText>{item.address}</MessageText>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.padding,
              alignItems: "center",
            }}
          >
            <Image
              source={images.notfound}
              resizeMode="cover"
              style={{
                width: 300,
                height: 250,
                borderRadius: 15,
                marginTop: 100,
              }}
            />
            <Text>Không có dữ liệu</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RescueScreen;
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
    marginLeft: 10,
    backgroundColor: "#f3f4f5",
    width: 320,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: 320,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
