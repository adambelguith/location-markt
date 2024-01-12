import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState , useLayoutEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { productdata } from "../Data/ProductData";
import CartIcon from "../../assets/icons/cart";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import usericon from "../../assets/icons/usericon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { navigate } = useNavigation();
  const [logState, setLogState ] = useState(null)
  const isFocused = useIsFocused();
 
  const getDataUser= async ()=>{
    const log = await AsyncStorage.getItem("jwtTokens");
    const blog = await AsyncStorage.getItem('isLoggedIn');
    setLogState(log)
  }

  const logout = async () =>{
    await AsyncStorage.removeItem('jwtTokens')
    setLogState(null)
  }
  useFocusEffect(()=>{
    if(isFocused){ 
    getDataUser()
    }
  })
  
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)
          .duration(600)
          .springify()
          .damping(12)}
      >
        <TouchableRipple
          className="m-2"
          onPress={() => {
            navigate("ProductDetail", { data: item });
          }}
        >
          <ProductCard item={item} />
        </TouchableRipple>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container} className="bg-[#ece8e8]">
      <SafeAreaView />
      <View style={styles.header} className="justify-between">
        <Animated.View entering={FadeInLeft.delay(100).duration(400)}>
          <Text
            style={styles.logo}
            className="text-4xl text-[#5a7a7a] font-bold pt-2"
          >
            Ekrini
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeInRight.delay(100).duration(400)}
        ></Animated.View>
        {logState === null && (
          
          <View className="mx-4 mt-2">
            <TouchableRipple
              className="m-2"
              onPress={() => {
                navigate("Signin", {navige:'Home'});
              }}
            >
              <Image
                style={{ width: 40, height: 40, borderWidth: 1 }}
                source={{ uri: usericon }}
                className=""
              />
            </TouchableRipple>
          </View>
        )} 
        {logState !== null &&(
          <TouchableRipple
          className="m-4"
          onPress={() => {
            logout()
          }}
        >
          <Text className="text-[#313deb] font-medium">Logout </Text>
        </TouchableRipple>
        )}
      </View>
      <Animated.View entering={FadeInLeft.delay(200).duration(500)}>
        <View className="px-[30px] my-2">
          <Text className="text-[14px] font-semibold text-[#3a4040] drop-shadow-xl">
            Application for renting products
          </Text>
        </View>
      </Animated.View>
      {/* <ProductCard /> */}
      <FlatList
        data={productdata}
        // keyExtractor={(item) => `$(item.id)`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // paddingTop: 50,
    // backgroundColor: "#24a8af",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    paddingHorizontal: 10,
  },
  contentContainerStyle: {
    alignItems: "center",
  },
});
