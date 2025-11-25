import { Drawer } from "expo-router/drawer";

console.log("Screen Loaded: _layout"); // change for each screen

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerType: "front",
        drawerActiveTintColor: "#e91e63",
        drawerPosition: "left",
        drawerStyle: { width: 200 },
        headerShown: false,
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Product" />
      <Drawer.Screen name="AddProduct" />
      <Drawer.Screen name="MultiInvoice" />
      <Drawer.Screen name="OrderHistory" />
      <Drawer.Screen name="Logout" />
    </Drawer>
  );
}
