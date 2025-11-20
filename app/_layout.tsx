import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("hudwater");
      await setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="/(drawer)/Product" />
      ) : (
        <Stack.Screen name="screens/HomeScreen" />
      )}
    </Stack>
  );
}

// import { Stack, useSegments, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator, View } from "react-native";

// export default function RootLayout() {
//   const segments = useSegments();
//   const router = useRouter();

//   const [isReady, setIsReady] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Read login status only once
//   useEffect(() => {
//     const checkUser = async () => {
//       const user = await AsyncStorage.getItem("hudwater");
//       setIsLoggedIn(!!user);
//       setIsReady(true);
//     };

//     checkUser();
//   }, []);

//   // Redirect ONLY when segments change
//   useEffect(() => {
//     if (!isReady) return;

//     const inAuthGroup = segments[0] === "screens"; // Login is inside /screens

//     if (!isLoggedIn && !inAuthGroup) {
//       router.replace("/screens/HomeScreen"); // go to login
//     }

//     if (isLoggedIn && inAuthGroup) {
//       router.replace("/(drawer)/Product"); // go to drawer
//     }
//   }, [isReady, isLoggedIn, segments]);

//   if (!isReady) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return <Stack screenOptions={{ headerShown: false }} />;
// }

