// This file defines a React Context which keeps track of the authenticated session.

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "my-jwt";
export const AuthContext = createContext({});

// export const useAuth = useContext(AuthContext)

export const AuthContextProvider =({ children })=> {
  const [auth, setAuth] = useState({
    token: null,
    authen: null,
  });

  useEffect(()=>{
const loadToken = async () =>{
const token = await AsyncStorage.getItem(TOKEN_KEY);
if (token){
    setAuth({
        token:token,
        authen:true,
    })
}
}
loadToken();
  },[])
  const register = async (email, password) => {
    try {
      setAuth({
        token: "tokennnn",
        authen: true,
      });
      await AsyncStorage.setItem(TOKEN_KEY, auth);
    } catch (e) {
      return { e };
    }
  };
  const login = async (email, password) => {
 
      setAuth({
        token: "tokennnn",
        authen: true,
      });
      await AsyncStorage.setItem(TOKEN_KEY, auth);
      return "autheficated"
   
  };

  const logout = async () => {
    setAuth({
      token: null,
      authen: false,
    });
    await AsyncStorage.setItem(TOKEN_KEY, auth);
  };

  const valuess = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    auth,
  };

  return <AuthContext.Provider value={{valuess}}>{children}</AuthContext.Provider>;
}
