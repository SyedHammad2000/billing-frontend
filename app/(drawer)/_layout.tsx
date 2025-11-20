import { Drawer } from "expo-router/drawer";

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

      
    />
  );
}
