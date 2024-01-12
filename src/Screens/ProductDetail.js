import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Modal,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../assets/icons/back";
import CartIcon from "../../assets/icons/cart";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import Calendar from "react-native-calendars/src/calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableRipple } from "react-native-paper";

const ProductDetail = () => {
  const { params } = useRoute();
  const { goBack, navigate } = useNavigation();
  const data = params?.data;
  const { width, height } = useWindowDimensions();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const flatListRef = useRef();
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedImage,
      animated: true,
    });
  }, [selectedImage]);
 const handlechecksign = async () =>{
  const log = await AsyncStorage.getItem("jwtTokens");
  if(log){
    navigate("ShopForm", {product:data});
  } else{
    navigate("Signin",{navige:"ShopForm", product:data});
  }
 }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.backgroundgrey} className="h-[650px]">
          <View className="flex-row items-center justify-between py-4 px-4 ">
            <Animated.View entering={FadeInLeft.delay(50).duration(100)}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={styles.iconBack}
                className="bg-white h-12 w-12 items-center justify-center rounded-full"
              >
                <BackIcon />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={{ height: height / 2 }}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
              horizontal
              onScroll={(e) => {
                setSelectedIndex(
                  (e.nativeEvent.contentOffset.x / width).toFixed(0)
                );
              }}
              data={data.thumbnail}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Image
                    key={index}
                    source={item}
                    style={{ width: width, height: height / 2 }}
                  />
                );
              }}
            />
            <View
              style={{
                width: width,
                height: 40,
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data.thumbnail.map((item, index) => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        selectedIndex == index ? "#8e8e8e" : "#f2f2f2",
                      height: 5,
                      width: 30,
                      alignSelf: "center",
                    }}
                    key={index}
                    className="rounded-xl"
                  >
                    <View className="mx-4"></View>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              data={data.thumbnail}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: width / 5,
                      height: height / 5,
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                    onPress={() => {
                      setSelectedIndex(index);
                      setSelectedImage(index);
                    }}
                    className="rounded-lg mx-1"
                  >
                    <Image
                      source={item}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                );
              }}
              className="mx-4 mt-2"
            />
          </View>
        </View>
        <View className="">
          <View className="flex-row items-center justify-between p-4">
            <Text className="text-xl font-bold">{data.title}</Text>
            <Text className="text-[24px] text-[#322d2d] font-semibold ">
              <Text className="text-[#24a8af]">$</Text>
              {data.price}
              <Text className="text-[14px] font-light"> /day</Text>
            </Text>
          </View>
          <View className="fixed bottom-0 w-full">
            <TouchableRipple
              onPress={() => {
                handlechecksign()
                
              }}
              style={{
                borderRadius: 25,
                padding: 10,
                width: 200,
                alignItems: "center",
              }}
              className="justify-center mx-auto bg-[#24a8af] mt-2 flex-row "
            >
              <Text
                style={{ color: "white", fontSize: 22 }}
                className="font-semibold"
              >
                Order Request
              </Text>
            </TouchableRipple>
          </View>
          <Text className="my-6 mx-4 text-[#141313] text-[16px] text-justify">
            {data.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundgrey: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "lightgrey",
  },
  iconBack: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  imageContainer: {
    alignSelf: "center",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  imagess: {
    // width:'100%',
    // height:undefined,
    aspectRatio: 1,
    alignSelf: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    resizeMode: "contain",
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});
