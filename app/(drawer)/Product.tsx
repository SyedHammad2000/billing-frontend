import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { BASE_URL } from "@/constants/api";
import ".././../global.css";
import Product_id from "@/components/Product_id";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Products = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

const Product = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [product, setProduct] = React.useState<Products[]>([]);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useEffect(() => {
    const token = AsyncStorage.getItem("hudwater");
    console.log("Token:", token);
    GetAll();
  }, []);
  const GetAll = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/`);
      console.log(res);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ marginTop: 40 }} className="bg-black">
        <TouchableOpacity
          onPress={openDrawer}
          style={{ position: "absolute", left: 10 }}
        >
          <Text style={{ fontSize: 32 }}>☰</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Products</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
          marginBottom: 60,

          // width: 200,
        }}
      >
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={product}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#dedbd2",
                padding: 10,
                borderRadius: 10,
                margin: 10,
                width: 150,
              }}
              onPress={() => router.push(`/product/${item?._id}`)}
              // onPress={() => {
              //   router.push(`${item?._id}`);
              // }}
              //
            >
              <View
                style={{
                  width: "100%",
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  // resizeMode="cover"
                  alt={item?.name}
                />
              </View>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {item?.name}
              </Text>
              <Text>{item?.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default Product;

// css
