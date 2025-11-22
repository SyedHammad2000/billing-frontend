import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";


console.log("Screen Loaded: loginscreen"); // change for each screen



export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("hudwater");
      if (token) {
        router.replace("/(drawer)/Product");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    if (email === "hudwater@gmail.com" && password === "123456") {
      const name = "hudwater";
      await AsyncStorage.setItem(name, JSON.stringify(name));
      router.replace("/(drawer)/Product");
      alert("Login successful");
    } else {
      alert("Invalid email or password");
    }

    // Navigate to home page after login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {/* Email Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Field */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Text style={styles.showText}>{showPass ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 35,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  showText: {
    color: "blue",
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  linkText: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
    fontSize: 15,
  },
});
