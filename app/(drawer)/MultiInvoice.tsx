import { BASE_URL } from "@/constants/api";
import generateInvoice2 from "@/utils/generateInvoice2";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MultiInvoice = () => {
  const [customerName, setCustomerName] = useState("");
  const [price1, setPrice1] = useState<any>();
  const [quantity1, setQuantity1] = useState<any>();
  const [quantity2, setQuantity2] = useState<any>();
  const [litre1, setLitre1] = useState("");
  const [litre2, setLitre2] = useState("");
  const [price2, setPrice2] = useState<any>();

  const handleOrder = async () => {
    try {
      if (
        !customerName ||
        !price1 ||
        !quantity1 ||
        !litre1 ||
        !price2 ||
        !quantity2 ||
        !litre2
      )
        return;

      const res = await axios.post(`${BASE_URL}/api/v1/multipleinvoice`, {
        customerName,
        price1,
        quantity1,
        litre1,
        price2,
        quantity2,
        litre2,
      });

      console.log("Invoice saved:", res.data);
      const pdfPath = await generateInvoice2({
        // price: product.price,
        // quantity: quantity || 1,
        customerName,
        // litre: product.litre,
        price1,
        quantity1,
        litre1,
        price2,
        quantity2,
        litre2,
        logoUri:
          "https://upcdn.io/W23MTSj/raw/uploads/2025/11/21/4jMQpU3TJY-upload.jpg",
      });
      if (res.status == 200) {
        Alert.alert("Success", "Invoice saved successfully in Database");
      } else {
        Alert.alert("Error", "Invoice not saved in Database");
      }
      setQuantity1(0);
      setCustomerName("");
      setQuantity2(0);
      setLitre1("");
      setLitre2("");
      setPrice1(0);
      setPrice2(0);

      Alert.alert("PDF Generated", `PDF saved at: ${pdfPath}`);
    } catch (error) {
      console.log("Error creating invoice:", error);
      Alert.alert("Error", "Failed to create invoice");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
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
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        MultiInvoice
      </Text>

      <View>
        <TextInput
          placeholder="Customer Name"
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
          value={customerName}
          onChangeText={(text) => setCustomerName(text)}
        />
        <TextInput
          placeholder="Product 1 Litre"
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
          value={litre1}
          onChangeText={setLitre1}
        />
        <TextInput
          placeholder="Product 1 Price"
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
          value={price1}
          onChangeText={setPrice1}
        />
        <TextInput
          placeholder="Product 1 Quantity"
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
          value={quantity1}
          onChangeText={setQuantity1}
        />
        <TextInput
          placeholder="Product 2 Litre"
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
          value={litre2}
          onChangeText={setLitre2}
        />
        <TextInput
          placeholder="Product 2 Price"
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
          value={price2}
          onChangeText={setPrice2}
        />
        <TextInput
          placeholder="Product 2 Quantity"
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
          value={quantity2}
          onChangeText={setQuantity2}
        />
      </View>
      <Pressable
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
      </Pressable>
    </SafeAreaView>
  );
};

export default MultiInvoice;
