import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/auth-context";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={handleLogout}>
    //     <Text style={styles.title}>Home</Text>
    //   </TouchableOpacity>
    // </View>
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.welcome}>welcome to your account</Text>
          </View>
          <View style={styles.notification}>
            <Ionicons name="notifications" size={24} color="white" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardName}>John Smith</Text>
          <Text style={styles.cardType}>Amazon Platinium</Text>
          <Text style={styles.cardNumber}>4756 **** **** 9018</Text>
          <Text style={styles.cardBalance}>$3,469.52</Text>
          <Text style={styles.cardVisa}>VISA</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBox}>
            <Ionicons name="card" size={28} color="#0A0A60" />
            <Text style={styles.actionText}>Account and Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBox}>
            <MaterialIcons name="compare-arrows" size={28} color="#0A0A60" />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBox}>
            <FontAwesome5 name="money-bill-wave" size={28} color="#0A0A60" />
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.title}>logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A60",
    padding: 20,
    justifyContent: "space-between",
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  headerText: { flex: 1, marginLeft: 10 },
  welcome: { color: "white", fontSize: 16, fontWeight: "bold" },
  notification: { position: "relative" },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },

  // Card
  card: {
    backgroundColor: "#0A0A60",
    borderRadius: 15,
    padding: 20,
    margin: 20,
  },
  cardName: { color: "white", fontSize: 18, fontWeight: "bold" },
  cardType: { color: "white", fontSize: 14, marginVertical: 5 },
  cardNumber: { color: "white", fontSize: 16, marginVertical: 10 },
  cardBalance: { color: "white", fontSize: 22, fontWeight: "bold" },
  cardVisa: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },

  // Actions
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  actionBox: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "28%",
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#0A0A60",
  },
});
function setIsAuthenticated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
