import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.push("/");
  };
  return (
    <View>
      {/* <TouchableOpacity
        onPress={() => {
          console.log("pressed");
          handleLogout();
        }}
      ></TouchableOpacity> */}
    </View>
  );
};

export default Logout;
