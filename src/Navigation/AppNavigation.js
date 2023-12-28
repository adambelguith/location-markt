import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ProductDetails from "../Screens/ProductDetail";
import SplashScreen from "../Screens/SplashScreen";
import ShopForm from "../Screens/ShopForm";

const Stack = createNativeStackNavigator();

function AppNavigation() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;