import UploadImage from "@/components/UploadImage";
import { BASE_URL } from "@/constants/api";
import { DrawerActions } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

const AddProduct = () => {
  const navigation = useNavigation();
  const [reset, setReset] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [litre, setLitre] = useState("");
  // public_W23MTSjFo8MYvm4UESmym8n3wSLh
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleUpload = async (e: any) => {
    if (!productName || !productPrice || !litre) {
      return alert("Please fill all the fields");
    }
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/add`, {
        name: productName,
        price: productPrice,
        litre,
        image: uploadedUrl,
      });
      console.log(res);
      setProductName("");
      setProductPrice("");
      setLitre("");
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
    <View style={{ marginTop: 40 }} className="bg-black">
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
          placeholder="Price"
          placeholderTextColor="#999"
          value={productPrice?.toString()}
          onChangeText={setProductPrice}
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
          placeholder="Litre"
          placeholderTextColor="#999"
          value={litre}
          onChangeText={setLitre}
        />
      </View>
      <UploadImage onUpload={(url) => setUploadedUrl(url)} reset={reset} />

      <Pressable
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
      </Pressable>
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
