import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
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

const SearchCarScreen = ({ route, navigation }) => {
  const user = route?.params?.user;
  const [cars, setCars] = useState([]);
  const [licensePlate, setLicensePlate] = useState("");
  const textInputChange = (val) => {
    setLicensePlate(val);
  };
  const handleFilterCars = async (licensePlate) => {
    if (licensePlate) {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/search/${licensePlate}`
        );
        if (response.data.success) setCars(response.data.user);
      } catch (error) {
        console.log(error);
      }
    } else {
      showMessage({
        message: "Thất bại",
        description: "Vui lòng nhập biển số xe để tìm kiếm",
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };
  const carsFilter = cars?.filter((x) => x.licensePlate !== user?.licensePlate);

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
      <Text style={{ fontSize: 18, fontFamily: "Roboto-Bold" }}>
        Tìm kiếm xe
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
        <View style={styles.action}>
          <TextInput
            placeholder="Nhập biển số xe để tìm kiếm "
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          <TouchableOpacity
            onPress={() => {
              handleFilterCars(licensePlate);
            }}
          >
            <View>
              <Feather name="search" size={20} style={{ marginRight: 10 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "100%" }} style={styles.container2}>
        {cars?.length !== 0 ? (
          <FlatList
            data={carsFilter}
            key={(item) => item._id}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Card
                onPress={() =>
                  navigation.navigate("OrtherProfile", {
                    licensePlate: item.licensePlate,
                    profilePicture: item.profilePicture,
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
                    </UserInfoText>
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

export default SearchCarScreen;
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
