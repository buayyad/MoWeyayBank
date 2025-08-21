import { me } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import { deposit, withdrow } from "@/api/transaction";
import AuthContext from "@/context/auth-context";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const authState = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const queryClient = useQueryClient();

  const { mutate: mutateDeposit } = useMutation({
    mutationKey: ["deposit"],
    mutationFn: deposit,
    onSuccess: () => {
      console.log("Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: mutateWithdraw } = useMutation<number, Error, number>({
    mutationKey: ["withdrow"],
    mutationFn: withdrow,
    onSuccess: () => {
      console.log("Created Successfully2");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleLogout = async () => {
    await deleteToken();
    authState.setIsAuthenticated(false);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: me,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (isError) {
    return (
      <View>
        <Text>something went wrong</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const handleWithdraw = () => {
    const amountNum = +withdrawAmount;
    if (amountNum > data.balance) {
      Alert.alert("Error", "You don’t have enough balance!");
      return;
    }
    console.log("Withdrawn:", amountNum);
    data.balance -= amountNum;
    mutateWithdraw(amountNum);
    setWithdrawModal(false);
  };

  const handleDeposit = () => {
    const amountNum = +amount;
    if (amountNum <= 0) {
      Alert.alert("Error", "Enter a valid amount!");
      return;
    }
    console.log("Deposited:", amountNum);
    data.balance += amountNum;
    mutateDeposit(amountNum);
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={{ uri: data.image }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.welcome}>Welcome {data.username}</Text>
        </View>
        <View style={styles.actionsHeader}>
          <View style={styles.notification}>
            <Ionicons name="notifications" size={24} color="white" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Entypo name="log-out" size={24} color="#b81010ff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardName}>{data.username}</Text>
        <Text style={styles.cardType}>MoWeyay Premium Card</Text>
        <Text style={styles.cardNumber}>4756 **** **** 9018</Text>
        <Text style={styles.cardBalance}>${data.balance}</Text>
        <Text style={styles.cardVisa}>VISA</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Deposit Your Cash : </Text>

            <TextInput
              style={{ ...styles.textInput, marginBottom: 20, width: 100 }}
              placeholder="Enter Amount"
              keyboardType="numeric"
              onChangeText={(text) => setAmount(text)}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleDeposit}
            >
              <Text style={styles.textStyle}>Deposit</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                { backgroundColor: "gray", marginTop: 10 },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={withdrawModal}
        onRequestClose={() => setWithdrawModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Withdraw Cash</Text>

            <TextInput
              style={[styles.textInput, { marginBottom: 20 }]}
              placeholder="Enter Amount"
              keyboardType="numeric"
              onChangeText={(text) => setWithdrawAmount(text)}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleWithdraw}
            >
              <Text style={styles.textStyle}>Withdraw</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                { backgroundColor: "#b81010ff", marginTop: 10 },
              ]}
              onPress={() => setWithdrawModal(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="attach-money" size={28} color="#0A0A60" />
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBox}>
          <MaterialIcons name="compare-arrows" size={28} color="#0A0A60" />
          <Text style={styles.actionText}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => setWithdrawModal(true)}
        >
          <FontAwesome5 name="money-bill-wave" size={28} color="#0A0A60" />
          <Text style={styles.actionText}>Withdraw</Text>
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
  actionsHeader: { flexDirection: "row", alignItems: "center" },
  notification: { position: "relative", marginRight: 14 },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
  card: {
    backgroundColor: "#23234cff",
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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 12,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 22,
    width: "70%",
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: { borderRadius: 20, padding: 10, elevation: 2, width: "100%" },
  buttonOpen: { backgroundColor: "#ffbb94ff" },
  buttonClose: { backgroundColor: "#2a3b48ff" },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
