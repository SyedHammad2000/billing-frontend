import { BASE_URL } from "@/constants/api";
import generateInvoice from "@/utils/generateInvoice";
import generateInvoice2 from "@/utils/generateInvoice2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// ----------------- Month Selector -----------------
const MonthSelector = ({ selectedMonth, setSelectedMonth, months }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
      {/* Selector Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          borderWidth: 1,
          borderColor: "#aaa",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {months.find((m: any) => m.value === selectedMonth)?.label ??
            "Select Month"}
        </Text>
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal transparent visible={visible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              padding: 15,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
              Select Month
            </Text>

            {months.map((m: any) => (
              <TouchableOpacity
                key={m.value}
                onPress={() => {
                  setSelectedMonth(m.value);
                  setVisible(false);
                }}
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>{m.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 15,
                  color: "red",
                  fontWeight: "600",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
// ---------------------------------------------------

const OrderHistory = () => {
  const [invoice, setInvoice] = useState<any>([]);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = All

  const months = [
    { label: "All", value: 0 },
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const token = await AsyncStorage.getItem("hudwater");
        console.log("Token:", token);
        GetAll();
      };
      load();
    }, [])
  );

  const GetAll = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/order/invoice`);
      setInvoice(res.data);
    } catch (error) {
      console.log("Invoice fetch error:", error);
    }
  };

  const filteredInvoices =
    selectedMonth === 0
      ? invoice
      : invoice.filter((inv: any) => {
          const month = new Date(inv.date).getMonth() + 1;
          return month === selectedMonth;
        });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      {/* Back */}
      <TouchableOpacity
        style={{ position: "absolute", top: 30 }}
        onPress={() => router.replace("/(drawer)/Product")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 5,
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
        Orders Timeline
      </Text>

      {/* HERE: Selector Component */}
      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        months={months}
      />

      {/* Invoice List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredInvoices}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: "#dedbd2",
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                OrderNo: {index + 1}
              </Text>

              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Customer: {item.customerName}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>Qty: {item.quantity1}</Text>
                <Text style={{ fontSize: 18 }}>Price: {item.price1}</Text>
                <Text style={{ fontSize: 18 }}>Litre: {item.litre1}</Text>
              </View>

              {item.quantity2 > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Qty: {item.quantity2}</Text>
                  <Text style={{ fontSize: 18 }}>Price: {item.price2}</Text>
                  <Text style={{ fontSize: 18 }}>Litre: {item.litre2}</Text>
                </View>
              )}

              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
                Total: {item.total}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  Date: {item.date.split("T")[0]}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    item?.litre2
                      ? generateInvoice2({
                          customerName: item.customerName,
                          litre1: item.litre1,
                          quantity1: item.quantity1,
                          price1: item.price1,
                          litre2: item.litre2,
                          quantity2: item.quantity2,
                          price2: item.price2,
                          logoUri: "https://i.ibb.co/PzW9cb9G/hudwater.png",
                        })
                      : generateInvoice({
                          customerName: item.customerName,
                          litre1: item.litre1,
                          quantity1: item.quantity1,
                          price1: item.price1,
                          logoUri: "https://i.ibb.co/PzW9cb9G/hudwater.png",
                        })
                  }
                >
                  <Text
                    style={{ fontSize: 16, color: "blue", fontWeight: "bold" }}
                  >
                    Generate Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderHistory;
