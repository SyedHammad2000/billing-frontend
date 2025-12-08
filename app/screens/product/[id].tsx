import { BASE_URL } from "@/constants/api";
import generateInvoice from "@/utils/generateInvoice";
import generateInvoice2 from "@/utils/generateInvoice2";
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
  const [quantity1, setQuantity1] = useState<any>("");
  const [quantity2, setQuantity2] = useState<any>("");

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
        quantity1,
        customerName: product.customerName,
        price1: product.price1,
        litre1: product.litre1,
        quantity2,
        price2: product.price2,
        litre2: product.litre2,
      });

      console.log("Invoice saved:", res.data);

      if (res.status == 200) {
        if (quantity2 && product.price2 > 0 && product.litre2) {
          const pdfPath = await generateInvoice2({
            price1: product.price1,
            quantity1: quantity1 || 1,
            price2: product.price2,
            quantity2: quantity2 || 1,
            customerName: product.customerName,
            litre1: product.litre1,
            litre2: product.litre2,
            logoUri: "https://i.ibb.co/PzW9cb9G/hudwater.png",
          });
          Alert.alert("PDF Generated", `PDF saved at: ${pdfPath}`);
          Alert.alert("Success", "Invoice saved successfully in Database");
          setQuantity1("");
          setQuantity2("");
          return;
        }
        const pdfPath = await generateInvoice({
          price1: product.price1,
          quantity1: quantity1 || 1,
          customerName: product.customerName,
          litre1: product.litre1,
          logoUri: "https://i.ibb.co/PzW9cb9G/hudwater.png",
        });
        Alert.alert("PDF Generated", `PDF saved at: ${pdfPath}`);
        Alert.alert("Success", "Invoice saved successfully in Database");
      } else {
        Alert.alert("Error", "Invoice not saved in Database");
      }
      setQuantity1("");
      setQuantity2("");
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
        value={quantity1}
        onChangeText={setQuantity1}
        placeholder="Quantity-1"
        placeholderTextColor={"gray"}
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
      {product?.litre2 && (
        <TextInput
          value={quantity2}
          onChangeText={setQuantity2}
          placeholder="Quantity-2"
          placeholderTextColor={"gray"}
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
      )}

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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Name: {product?.customerName}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            1# Litre:
            {product?.litre1}
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            Price: {product?.price1}
          </Text>
        </View>
        {/* bottomline */}
        <View style={{ height: 1, backgroundColor: "black", marginTop: 10 }} />
        {product?.litre2 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
              2# Litre:
              {product?.litre2}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
              Price: {product?.price2}
            </Text>
          </View>
        )}
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
