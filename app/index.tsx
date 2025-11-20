// // app/index.tsx
// import { Text, View } from "react-native";

// export default function Home() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Welcome to the Home Page!</Text>
//     </View>
//   );
// }

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Stack } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function RootLayout() {
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = await AsyncStorage.getItem("hudwater");
//       await setIsLoggedIn(!!token);
//       setLoading(false);
//     };
//     checkLogin();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {isLoggedIn ? (
//         <Stack.Screen name="(drawer)" />
//       ) : (
//         <Stack.Screen name="screens/HomeScreen" />
//       )}
//     </Stack>
//   );
// }

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
        source={require("@/assets/images/water.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
