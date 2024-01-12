import React, {useReducer, useMemo, useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ProductDetails from "../Screens/ProductDetail";
import SplashScreen from "../Screens/SplashScreen";
import ShopForm from "../Screens/ShopForm";
import Signin from "../Screens/Signin";
import Signup from "../Screens/Signup";
import Pay from "../Screens/Pay";
// import { useAuth } from "../components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AppNavigation() {
// const {auth, onLogout } =useAuth()
// console.log("auth",auth)

  return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="ProductDetail" component={ProductDetails} />
          <Stack.Screen name="ShopForm" component={ShopForm} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Pay" component={Pay} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default AppNavigation;
