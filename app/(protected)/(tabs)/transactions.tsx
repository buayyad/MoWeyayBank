import { Transaction, transactions } from "@/api/transaction";
import { AntDesign, Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type TypeFilter = "all" | "deposit" | "withdraw" | "transfer";

export default function TransactionsScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactions,
  });

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<TypeFilter>("all");
  const [byDate, setByDate] = useState(false);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const openDate = (which: "from" | "to") => {
    const value = which === "from" ? from ?? new Date() : to ?? new Date();
    DateTimePickerAndroid.open({
      value,
      onChange: (_, d) => {
        if (!d) return;
        if (which === "from") setFrom(d);
        else setTo(d);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const filtered = useMemo(() => {
    const list = (data ?? [])
      .slice()
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list.filter((t) => {
      if (filter !== "all" && t.type !== filter) return false;
      if (q && !`${t.type} ${t.amount}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (byDate) {
        const d = new Date(t.createdAt);
        if (from && d < new Date(from.setHours(0, 0, 0, 0))) return false;
        if (to && d > new Date(to.setHours(23, 59, 59, 999))) return false;
      }
      return true;
    });
  }, [data, filter, q, byDate, from, to]);

  const renderItem = ({ item }: { item: Transaction }) => {
    const sign = item.type === "deposit" ? "+" : "-";
    const color = item.type === "deposit" ? "#0A8F3F" : "#C62828";
    const date = new Date(item.createdAt).toLocaleDateString();
    return (
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={[styles.amount, { color }]}>
            {sign}
            {Number(item.amount).toLocaleString()}
          </Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    );
  };

  if (isLoading)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  if (isError)
    return (
      <View style={styles.center}>
        <Text>Failed to load</Text>
        <Text style={{ color: "#666", marginTop: 6 }}>
          {(error as Error).message}
        </Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchWrap}>
        <Feather name="search" size={18} color="#666" />
        <TextInput
          placeholder="Search"
          value={q}
          onChangeText={setQ}
          style={styles.search}
          returnKeyType="search"
        />
        <Pressable onPress={() => refetch()} style={styles.refreshBtn}>
          <AntDesign name="reload1" size={16} color="#0A0A60" />
        </Pressable>
      </View>

      <View style={styles.filtersRow}>
        <Pressable
          onPress={() => setFilter("all")}
          style={[styles.pill, filter === "all" && styles.pillActive]}
        >
          <Text
            style={[styles.pillText, filter === "all" && styles.pillTextActive]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("deposit")}
          style={[styles.pill, filter === "deposit" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              filter === "deposit" && styles.pillTextActive,
            ]}
          >
            Deposit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("withdraw")}
          style={[styles.pill, filter === "withdraw" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              filter === "withdraw" && styles.pillTextActive,
            ]}
          >
            Withdraw
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("transfer")}
          style={[styles.pill, filter === "transfer" && styles.pillActive]}
        >
          <Text
            style={[
              styles.pillText,
              filter === "transfer" && styles.pillTextActive,
            ]}
          >
            Transfer
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setByDate((v) => !v)}
          style={[styles.pill, byDate && styles.pillActive]}
        >
          <Text style={[styles.pillText, byDate && styles.pillTextActive]}>
            By Date
          </Text>
        </Pressable>
      </View>

      {byDate && (
        <View style={styles.dateRow}>
          <Pressable onPress={() => openDate("from")} style={styles.dateBox}>
            <Text style={styles.dateLabel}>From</Text>
            <Text style={styles.dateValue}>
              {from ? from.toLocaleDateString() : "--/--/----"}
            </Text>
          </Pressable>
          <Pressable onPress={() => openDate("to")} style={styles.dateBox}>
            <Text style={styles.dateLabel}>To</Text>
            <Text style={styles.dateValue}>
              {to ? to.toLocaleDateString() : "--/--/----"}
            </Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(t) => String(t.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<Text style={styles.empty}>No transactions</Text>}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={
          filtered.length ? { paddingVertical: 10 } : styles.center
        }
        style={{ paddingHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    margin: 12,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#fff",
  },
  search: { flex: 1, marginLeft: 8 },
  refreshBtn: { padding: 8 },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 12,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  pillActive: { backgroundColor: "#0A0A60" },
  pillText: { color: "#0A0A60" },
  pillTextActive: { color: "#fff", fontWeight: "700" },
  dateRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  dateLabel: { color: "#666", fontSize: 12, marginBottom: 4 },
  dateValue: { fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  left: { flexDirection: "column" },
  amount: { fontSize: 16, fontWeight: "800" },
  date: { color: "#666", marginTop: 4, fontSize: 12 },
  type: { fontWeight: "700", textTransform: "capitalize" },
  empty: { color: "#666" },
});
