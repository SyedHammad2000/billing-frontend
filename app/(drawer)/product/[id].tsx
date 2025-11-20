import { router } from "expo-router";
import React from "react";
import {  Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetail = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", marginLeft: 20 }}
    >
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: "100%",
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          marginTop: 10,
        }}
        onPress={() => router.replace("/(drawer)/Product")}
      >
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity>
      <Text>Product</Text>
    </SafeAreaView>
  );
};

export default ProductDetail;
