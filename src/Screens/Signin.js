import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Users from "../Data/users";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackIcon from "../../assets/icons/back";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userSchema = Yup.object({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .min(4, "Too Short")
    .max(50, "Too long")
    .required("Name is required"),
});

const Signin = () => {
  const { params } = useRoute();
  const { goBack, navigate } = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const navige = params?.navige
  const prod = params?.product
  console.log("product",prod)

  const initialValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: userSchema,
      initialValues: initialValues,
      onSubmit: async (values) => {
        const signinfo ={
            emailauth: values.email,
            token:"tokenassync"
        }
        await AsyncStorage.setItem('jwtTokens', JSON.stringify(signinfo));
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        setTimeout(() => {
          if(prod){
            navigate(navige, {product:prod})
          }else{
            navigate(navige);
          }
         
        }, 1500); 
      },
    });

  return (
    <View>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.backgroundgrey} className="h-[140px] bg-[#b5b7ba]">
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
        <View className="mx-auto " style={styles.container}>
          <Text className="text-[#ffffff] text-4xl font-bold ">Welcome</Text>
        </View>
      </View>
      <View className="">
        <View className="mx-auto my-4">
          <Text className="text-3xl text-[#24a8af] font-black ">Log In</Text>
        </View>
        <View
          className="h-[70%] mx-2 border-solid drop-shadow-2xl"
          style={styles.shadowbox}
        >
          <View className="mx-auto mt-14">
            <View className="ml-6">
              <Text className="text-2xl font-bold">Email</Text>
            </View>
            <View className=" mt-4 w-[300px]">
              <TextInput
                left={
                  <TextInput.Icon icon="email" size={24} color={"#24a8af"} />
                }
                icon="mail"
                className="rounded-sm "
                placeholder="Email"
                keyboardType="email-address"
                textContentType={"emailAddress"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                placeholderTextColor="#24a8af"
                returnKeyType="next"
                outlineColor="black"
                activeOutlineColor="#326A81"
                autoCapitalize="none"
                mode="outlined"
              />
            </View>
            <View className="mt-8 ml-6">
              <Text className="text-2xl font-bold">Password</Text>
            </View>
            <View className=" mt-4 w-[300px]">
              <TextInput
                icon="password"
                className="rounded-sm "
                placeholder="password"
                secureTextEntry={hidePass ? true : false}
                selectionColor="#326A81"
                blurOnSubmit={false}
                right={
                  <TextInput.Icon
                    icon="eye"
                    color={"#24a8af"}
                    onPress={() => setHidePass(!hidePass)}
                  />
                }
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
                placeholderTextColor="#24a8af"
                outlineColor="black"
                activeOutlineColor="#326A81"
                autoCapitalize="none"
                returnKeyType="next"
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              className="bg-[#24a8af] mt-12"
            >
                <Text className="text-xl">
              Sign In
              </Text>
            </Button>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Signin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
  },
  backgroundgrey: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  shadowbox: {
    shadowColor: "#b5b7ba",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 30,
    borderRadius: 30,
    elevation: 5,
  },
});
