import { DrawerActions } from "@react-navigation/native";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { BASE_URL } from "@/constants/api";
import ".././../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log("Screen Loaded Product");

type Products = {
  _id: string;
  name: string;
  price: number;
  litre: string;
  image?: string;
};

const Product = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [product, setProduct] = React.useState<Products[]>([]);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  useFocusEffect(
    useCallback(() => {
      const token = AsyncStorage.getItem("hudwater");
      console.log("Token:", token);
      GetAll();
    }, [])
  );

  const GetAll = async () => {
    try {
      const res = await axios
        .get(`${BASE_URL}/api/v1/`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      console.log(res);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ marginTop: 40 }} className="bg-black">
        <Text style={{ color: "red", margin: 10, fontSize: 16 }}>
          API URL: {BASE_URL}
        </Text>
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
          marginBottom: 120,

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
              onPress={() => router.push(`/screens/product/${item?._id}`)}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Rs:{item?.price}</Text>
                <Text style={{ fontWeight: "bold" }}>Ml:{item?.litre}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default Product;

// css
