import UploadImage from "@/components/UploadImage";
import { BASE_URL } from "@/constants/api";
import { DrawerActions } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

console.log("Screen Loaded AddProduct");

const AddProduct = () => {
  const navigation = useNavigation();
  const [reset, setReset] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice1, setProductPrice1] = useState("");
  const [productPrice2, setProductPrice2] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [litre1, setLitre1] = useState("");
  const [litre2, setLitre2] = useState("");
  // public_W23MTSjFo8MYvm4UESmym8n3wSLh
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleUpload = async (e: any) => {
    if (!productName || !productPrice1 || !litre1) {
      return alert("Please fill all the fields");
    }
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/add`, {
        customerName: productName,
        price1: productPrice1,
        litre1,
        price2: productPrice2,
        litre2,
      });
      console.log(res);
      setProductName("");
      setProductPrice1("");
      setLitre1("");
      setProductPrice2("");
      setLitre2("");
      setUploadedUrl("");

      setReset(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (reset) {
      setReset(false);
      setUploadedUrl("");
    }
  }, [reset]);

  return (
    <View style={{ marginTop: 40 }}>
      <TouchableOpacity
        onPress={openDrawer}
        style={{ position: "absolute", left: 10 }}
      >
        <Text style={{ fontSize: 32 }}>☰</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Add Product</Text>
      </View>
      <View>
        <TextInput
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
          placeholder="Product Name"
          placeholderTextColor="#999"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <TextInput
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
          placeholder="Litre-1"
          placeholderTextColor="#999"
          value={litre1}
          onChangeText={setLitre1}
        />
      </View>
      <TextInput
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
        placeholder="Price-1"
        placeholderTextColor="#999"
        value={productPrice1?.toString()}
        onChangeText={setProductPrice1}
      />
      <TextInput
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
        placeholder="Litre-2"
        placeholderTextColor="#999"
        value={litre2}
        onChangeText={setLitre2}
      />
      <TextInput
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
        placeholder="Price-2"
        placeholderTextColor="#999"
        value={productPrice2?.toString()}
        onChangeText={setProductPrice2}
      />
      {/* <UploadImage onUpload={(url) => setUploadedUrl(url)} reset={reset} /> */}

      <TouchableOpacity
        onPress={handleUpload}
        style={{
          backgroundColor: "black",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          width: 100,
          margin: "auto",
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
      </TouchableOpacity>
      <Pressable
        style={{
          padding: 10,
          borderRadius: 10,
          marginTop: 20,

          margin: "auto",
        }}
        onPress={() => setReset(true)}
      >
        {uploadedUrl ? (
          <Text
            style={{
              color: "black",
              textAlign: "center",
              backgroundColor: "red",
              padding: 10,
              borderRadius: 10,
            }}
          >
            Reset Pic
          </Text>
        ) : (
          <></>
        )}
      </Pressable>
    </View>
  );
};

export default AddProduct;
