import { BASE_URL } from "@/constants/api";
import generateInvoice from "@/utils/generateInvoice";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

console.log("Screen Loaded: [id]");

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<any>("");
  const [customername, setCustomername] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(id, product);

  const handleOrder = async () => {
    try {
      if (!product) return;

      const res = await axios.post(`${BASE_URL}/api/v1/multipleinvoice`, {
        productId: product._id,
        quantity1: quantity,
        customerName: customername,
        price1: product.price,
        litre1: product.litre,
      });

      console.log("Invoice saved:", res.data);

      if (res.status == 200) {
        const pdfPath = await generateInvoice({
          price1: product.price,
          quantity1: quantity || 1,
          customerName: customername,
          litre1: product.litre,
          logoUri:
            "https://upcdn.io/W23MTSj/raw/uploads/2025/11/21/4jMQpU3TJY-upload.jpg",
        });
        Alert.alert("PDF Generated", `PDF saved at: ${pdfPath}`);
        Alert.alert("Success", "Invoice saved successfully in Database");
      } else {
        Alert.alert("Error", "Invoice not saved in Database");
      }
      setQuantity("");
      setCustomername("");
    } catch (error) {
      console.log("Error creating invoice:", error);
      Alert.alert("Error", "Failed to create invoice");
    }
  };
  // const GenerateInvoice = async () => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" />

      {product && (
        <ImageBackground
          source={{ uri: product.image }}
          style={{ flex: 1, height: "100%" }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 30,
        }}
        onPress={() => router.replace("/(drawer)/Product")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 5,
            marginTop: 5,
            padding: 10,
            borderRadius: 100,
            backgroundColor: "black",
            width: 60,
            textAlign: "center",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>

      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantity"
        placeholderTextColor={"black"}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          color: "black",
        }}
      />

      <TextInput
        value={customername}
        onChangeText={setCustomername}
        placeholder="Customer Name"
        placeholderTextColor={"black"}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          color: "black",
        }}
      />

      <View
        style={{
          padding: 20,
          width: "80%",
          backgroundColor: "grey",
          marginHorizontal: "auto",
          marginBottom: 30,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Name: {product?.name}
        </Text>

        <Text style={{ fontSize: 30, marginTop: 10, fontWeight: "bold" }}>
          Price: {product?.price}
        </Text>

        <Text style={{ fontSize: 30, marginTop: 10, fontWeight: "bold" }}>
          {product?.litre}
        </Text>
      </View>
      <View
        style={{ alignItems: "center", display: "flex", flexDirection: "row" }}
      >
        <TouchableOpacity
          onPress={handleOrder}
          style={{ alignItems: "center", margin: "auto" }}
        >
          <Text
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              color: "white",
              fontSize: 20,

              marginHorizontal: "auto",
              marginBottom: 20,
            }}
          >
            Save Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
