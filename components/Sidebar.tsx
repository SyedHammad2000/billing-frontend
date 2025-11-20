import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Sidebar() {
  const translateX = useSharedValue(-width * 0.7); // hidden position

  const openSidebar = () => {
    translateX.value = withTiming(0, { duration: 300 });
  };

  const closeSidebar = () => {
    translateX.value = withTiming(-width * 0.7, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      {/* Hamburger button */}
      <TouchableOpacity style={styles.menuBtn} onPress={openSidebar}>
        <Text style={{ fontSize: 30,color:"black" }}>☰</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.sidebar, animatedStyle]}>
        <Text style={styles.title}>Menu</Text>

        <TouchableOpacity onPress={closeSidebar}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.item}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.item}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.item}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 999,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    fontSize: 20,
    marginVertical: 12,
  },
  close: {
    color: "red",
    fontSize: 18,
    marginBottom: 20,
  },
  menuBtn: {
    marginTop: 50,
    marginLeft: 20,
  },
});
