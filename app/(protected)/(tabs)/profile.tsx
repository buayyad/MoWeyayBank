import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/auth-context";
import React, { useContext } from "react";

function setIsAuthenticated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
const authState = useContext(AuthContext);

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const handleLogout = async () => {
  await deleteToken();
  authState.setIsAuthenticated(false);
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.title}>profile</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
});
