import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

console.log("Screen Loaded: HomeScreen index"); // change for each screen

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStorage();
  }, []);
  const checkStorage = async () => {
    const token = await AsyncStorage.getItem("hudwater");
    console.log("Token:", token);
    if (token) {
      router.replace("/(drawer)/Product"); // Replace so back button won't go to login
    } else {
      setLoading(false); // Show the welcome button if not logged in
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/hudwater.jpeg")}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingVertical: 20,
              paddingHorizontal: 40,
              borderRadius: 5,
            }}
            onPress={async () => {
              await checkStorage();
              router.replace("/screens/LoginScreen");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Welcome to HUD Water
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
