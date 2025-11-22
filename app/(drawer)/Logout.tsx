import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {  View } from "react-native";

console.log("Screen Loaded Log Out");

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.push("/");
  };
  return <View></View>;
};

export default Logout;
