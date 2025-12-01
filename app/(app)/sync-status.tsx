import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography, radii } from "~/theme";

interface PendingItem {
  id: string;
  type: "transaction" | "client";
  title: string;
  subtitle: string;
  createdAt: Date;
}

export default function SyncStatus() {
  const router = useRouter();
  const [pending] = useState<PendingItem[]>([
    {
      id: "p1",
      type: "transaction",
      title: "Trade #481516",
      subtitle: "New Transaction",
      createdAt: new Date(2025, 9, 26, 11, 42),
    },
    {
      id: "p2",
      type: "client",
      title: "John Appleseed",
      subtitle: "Client Update",
      createdAt: new Date(2025, 9, 26, 11, 40),
    },
    {
      id: "p3",
      type: "client",
      title: "Acme Corporation",
      subtitle: "New Client",
      createdAt: new Date(2025, 9, 26, 11, 39),
    },
    {
      id: "p4",
      type: "transaction",
      title: "Trade #234281",
      subtitle: "New Transaction",
      createdAt: new Date(2025, 9, 26, 11, 38),
    },
    {
      id: "p5",
      type: "transaction",
      title: "Trade #081547",
      subtitle: "New Transaction",
      createdAt: new Date(2025, 9, 26, 11, 37),
    },
  ]);
  const lastSynced = useMemo(() => new Date(2025, 9, 26, 11, 35), []); // Oct is month 9
  const syncing = false; // placeholder state

  function formatLastSynced(date: Date) {
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${month} ${day} at ${time}`;
  }

  function formatStamp(date: Date) {
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${month} ${day}, ${time}`;
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Sync Status</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIconOuter}>
            <View style={styles.summaryIconInner}>
              <MaterialIcons name="sync" size={28} color={colors.warning} />
            </View>
          </View>
          <Text style={styles.summaryTitle}>Sync Required</Text>
          <Text style={styles.summarySub}>
            {pending.length} items waiting to sync
          </Text>
        </View>

        <Text style={styles.lastSyncedText}>
          Last synced: {formatLastSynced(lastSynced)}
        </Text>

        <View style={styles.pendingBlock}>
          <Text style={styles.sectionTitle}>Unsynced Items</Text>
          <View style={styles.listCard}>
            {pending.length === 0 ? (
              <View style={styles.emptyWrap}>
                <MaterialIcons
                  name="cloud-done"
                  color={colors.success}
                  size={42}
                />
                <Text style={styles.emptyText}>
                  No pending items. You're synced.
                </Text>
              </View>
            ) : (
              pending.map((item, idx) => {
                const isLast = idx === pending.length - 1;
                return (
                  <View
                    key={item.id}
                    style={[styles.listRow, !isLast && styles.listDivider]}
                  >
                    <View style={styles.listLeft}>
                      <View style={styles.itemIcon}>
                        <MaterialIcons
                          name={
                            item.type === "transaction" ? "receipt" : "person"
                          }
                          size={18}
                          color={colors.primary}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <Text style={styles.itemTime}>
                      {formatStamp(item.createdAt)}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && { opacity: 0.95 }]}
          onPress={() => {
            /* TODO: Run sync */
          }}
        >
          <Text style={styles.ctaText}>Sync Now</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl, gap: spacing.xl },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  headerTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
  },
  summaryCard: {
    backgroundColor: colors.surface2,
    padding: spacing.xl,
    borderRadius: 28,
    alignItems: "center",
    gap: spacing.md,
  },
  summaryIconOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#2a3a4b",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#3a4a5b",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
  },
  summarySub: { color: colors.muted, fontSize: 16 },
  lastSyncedText: { color: colors.muted, alignSelf: "center" },
  pendingBlock: { gap: spacing.sm },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: typography.h3,
  },
  listCard: {
    backgroundColor: colors.surface2,
    borderRadius: 24,
    overflow: "hidden",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  listDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: "#142b4a",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: { color: colors.text, fontWeight: "700", fontSize: 16 },
  itemSubtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 2,
    fontWeight: "600",
  },
  itemTime: { color: colors.muted, fontWeight: "600" },
  emptyWrap: { alignItems: "center", padding: spacing.xl, gap: spacing.md },
  emptyText: { color: colors.muted, fontWeight: "600", textAlign: "center" },
  ctaBtn: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
