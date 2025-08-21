import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Transac555tions</Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700" },
});
// import React, { useEffect, useState, useContext } from "react";
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
// import AuthContext from "@/context/auth-context";
// import { getToken } from "@/api/storage";

// type Transaction = {
//   id: number;
//   date: string;
//   amount: number;
//   type: "deposit" | "withdraw";
// };

// export default function TransactionsScreen() {
//   const { token } = useContext(AuthContext); // نفترض أن التوكن موجود في السياق
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);

//   // جلب البيانات من API
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch("/mini-project/api/transactions/deposit", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setTransactions(data); // نتوقع أن ال API ترجع مصفوفة عمليات
//       } catch (error) {
//         console.error("خطأ في جلب العمليات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const renderItem = ({ item }: { item: Transaction }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.date}>{item.date}</Text>
//       <Text
//         style={[
//           styles.amount,
//           item.type === "deposit" ? styles.deposit : styles.withdraw,
//         ]}
//       >
//         {item.type === "deposit" ? `+${item.amount}` : `-${item.amount}`} KD
//       </Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>سجل العمليات</Text>
//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   date: {
//     color: "#666",
//     fontSize: 16,
//   },
//   amount: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   deposit: {
//     color: "#4CAF50",
//   },
//   withdraw: {
//     color: "#F44336",
//   },
// });
