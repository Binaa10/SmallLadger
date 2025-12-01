import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "~/components/Screen";
import { colors, spacing, typography, radii } from "~/theme";
import ListItem from "~/components/ListItem";

type TxKind = "sale" | "expense" | "iou";

interface TxItem {
  id: string;
  kind: TxKind;
  title: string;
  date: string; // ISO date string
  amount: number; // positive for sale/income, negative for expense, iou issue positive
}

export default function Transactions() {
  const [filter, setFilter] = useState<TxKind | "all">("all");
  const [query, setQuery] = useState("");

  const items = useMemo<TxItem[]>(
    () => [
      {
        id: "1",
        kind: "sale",
        title: "Client ABC Payment",
        date: "2024-10-26T14:45:00Z",
        amount: 1200,
      },
      {
        id: "2",
        kind: "expense",
        title: "Office Supplies",
        date: "2024-10-26T11:10:00Z",
        amount: -55.3,
      },
      {
        id: "3",
        kind: "expense",
        title: "Team Lunch",
        date: "2024-10-25T13:00:00Z",
        amount: -124.5,
      },
      {
        id: "4",
        kind: "sale",
        title: "Project Milestone",
        date: "2024-10-24T09:30:00Z",
        amount: 5000,
      },
      {
        id: "5",
        kind: "iou",
        title: "IOU Issued – Alex",
        date: "2024-10-15T10:00:00Z",
        amount: 500,
      },
    ],
    []
  );

  const filtered = items.filter((i) => {
    if (filter !== "all" && i.kind !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!i.title.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const amountColor = (n: number) => {
    if (n > 0) return colors.success;
    if (n < 0) return colors.danger;
    return colors.text;
  };

  const iconFor = (kind: TxKind) => {
    switch (kind) {
      case "sale":
        return {
          name: "arrow-upward" as const,
          tint: "#153626",
          iconColor: colors.success,
        };
      case "expense":
        return {
          name: "arrow-downward" as const,
          tint: "#3a1b1f",
          iconColor: colors.danger,
        };
      case "iou":
        return {
          name: "receipt-long" as const,
          tint: "#142b4a",
          iconColor: colors.primary,
        };
    }
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Transactions</Text>

        <View style={styles.searchShell}>
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, item, or amount..."
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterRow}>
          {[
            { key: "all", label: "All" },
            { key: "sale", label: "Sales" },
            { key: "expense", label: "Expenses" },
            { key: "iou", label: "IOUs" },
          ].map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key as any)}
              style={[
                styles.filterChip,
                filter === f.key && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.key && styles.filterTextActive,
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.listCard}>
          {filtered.map((tx, idx) => {
            const meta = iconFor(tx.kind);
            return (
              <ListItem
                key={tx.id}
                title={tx.title}
                subtitle={formatDate(tx.date)}
                left={
                  <View
                    style={[styles.iconBadge, { backgroundColor: meta.tint }]}
                  >
                    <MaterialIcons
                      name={meta.name}
                      size={20}
                      color={meta.iconColor}
                    />
                  </View>
                }
                right={
                  <Text
                    style={[styles.amount, { color: amountColor(tx.amount) }]}
                  >
                    {(tx.amount > 0 ? "+" : "") +
                      new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      }).format(tx.amount)}
                  </Text>
                }
                style={
                  idx === filtered.length - 1 ? styles.lastItem : undefined
                }
              />
            );
          })}
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No transactions match your search.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  searchShell: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#121c26",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1d2c3f",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: "#121c26",
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.muted,
    fontWeight: "600",
  },
  filterTextActive: {
    color: colors.text,
  },
  listCard: {
    backgroundColor: colors.surface2,
    borderRadius: 24,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: 0,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontWeight: "700",
    fontSize: typography.body,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  emptyState: {
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  emptyText: {
    color: colors.muted,
  },
});
