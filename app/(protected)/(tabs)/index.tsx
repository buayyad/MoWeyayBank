import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/auth-context";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  // delete token - use storage
  // update authContext
  // maybe neavigate
  const authState = useContext(AuthContext);
  // const {setIsAuthenticated} = useContext(AuthContext);

  const handleLogout = async () => {
    await deleteToken();
    authState.setIsAuthenticated(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.title}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
});
function setIsAuthenticated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
