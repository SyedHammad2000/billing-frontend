import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

const AddProduct = () => {
    
      const navigation = useNavigation();
const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    
      <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={openDrawer}
              style={{ position: "absolute", left: 10 }}
            >
              <Text style={{ fontSize: 32 }}>☰</Text>
            </TouchableOpacity>
    >
      <Text>AddProduct</Text>
    </View>
  );
};

export default AddProduct;
