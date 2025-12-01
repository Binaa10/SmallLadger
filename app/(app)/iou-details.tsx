import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography, radii } from "~/theme";

export default function IouDetails() {
  const router = useRouter();

  // Mock IOU + history data
  const iou = useMemo(
    () => ({
      debtor: "Alex Johnson",
      avatarPlaceholder: "A", // Could be replaced with Image
      outstanding: 250,
      initial: 500,
      issuedDate: "2024-10-15",
      dueDate: "2024-11-30",
      status: "Overdue" as const,
      notes:
        "Materials for the new office build-out. Payment expected upon project completion.",
      history: [
        {
          id: "h1",
          type: "payment" as const,
          label: "Payment Received",
          amount: -150,
          date: "2024-11-01",
        },
        {
          id: "h2",
          type: "payment" as const,
          label: "Payment Received",
          amount: -100,
          date: "2024-10-20",
        },
        {
          id: "h3",
          type: "issue" as const,
          label: "IOU Issued",
          amount: 500,
          date: "2024-10-15",
        },
      ],
    }),
    []
  );

  const formatMoney = (n: number) =>
    (n > 0 ? "+" : "") +
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(n);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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
          <Text style={styles.headerTitle}>IOU Details</Text>
          <Pressable hitSlop={10}>
            <MaterialIcons name="edit" size={20} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{iou.avatarPlaceholder}</Text>
            </View>
            <View style={styles.personMeta}>
              <Text style={styles.personName}>{iou.debtor}</Text>
              <Text style={styles.personSub}>Outstanding Amount</Text>
            </View>
          </View>
          <Text style={styles.outstandingValue}>
            {formatMoney(iou.outstanding)}
          </Text>
          <Text style={styles.dueText}>
            Due: {formatDate(iou.dueDate)} (Overdue)
          </Text>
        </View>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.statusOverdue}>{iou.status}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Initial Amount</Text>
            <Text style={styles.metaValue}>{formatMoney(iou.initial)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Date Issued</Text>
            <Text style={styles.metaValue}>{formatDate(iou.issuedDate)}</Text>
          </View>
        </View>

        <Text style={styles.notesText}>{iou.notes}</Text>

        <Text style={styles.sectionTitle}>Repayment History</Text>
        <View style={styles.historyCard}>
          {iou.history.map((h, idx) => (
            <View
              key={h.id}
              style={[
                styles.historyRow,
                idx === iou.history.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View
                style={[
                  styles.historyIconShell,
                  h.type === "payment" ? styles.iconPayment : styles.iconIssue,
                ]}
              >
                <MaterialIcons
                  name={h.type === "payment" ? "check" : "receipt-long"}
                  size={18}
                  color={h.type === "payment" ? colors.success : colors.primary}
                />
              </View>
              <View style={styles.historyMain}>
                <Text style={styles.historyLabel}>{h.label}</Text>
                <Text style={styles.historyDate}>{formatDate(h.date)}</Text>
              </View>
              <Text
                style={[
                  styles.historyAmount,
                  { color: h.amount < 0 ? colors.danger : colors.success },
                ]}
              >
                {formatMoney(h.amount)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Pressable style={[styles.actionBtn, styles.primaryAction]}>
            <Text style={styles.actionText}>Record Repayment</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.secondaryAction]}>
            <Text style={styles.secondaryText}>Mark as Paid</Text>
          </Pressable>
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
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
  },
  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#22324a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 20,
  },
  personMeta: { gap: 4 },
  personName: {
    color: colors.text,
    fontWeight: "700",
    fontSize: typography.h3,
  },
  personSub: { color: colors.muted, fontSize: typography.small },
  outstandingValue: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: typography.h1 + 4,
  },
  dueText: { color: colors.danger, fontWeight: "600" },
  metaCard: {
    backgroundColor: colors.surface2,
    borderRadius: 24,
    padding: spacing.lg,
    gap: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  metaLabel: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "600",
  },
  metaValue: { color: colors.text, fontWeight: "600" },
  statusOverdue: { color: colors.danger, fontWeight: "700" },
  notesText: { color: colors.muted, lineHeight: 20 },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
  },
  historyCard: {
    backgroundColor: colors.surface2,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  historyIconShell: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPayment: { backgroundColor: "#0f2c1e" },
  iconIssue: { backgroundColor: "#142b4a" },
  historyMain: { flex: 1 },
  historyLabel: { color: colors.text, fontWeight: "600" },
  historyDate: { color: colors.muted, fontSize: typography.small },
  historyAmount: { fontWeight: "700" },
  actionRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryAction: { backgroundColor: colors.primary },
  secondaryAction: { backgroundColor: "#14202c" },
  actionText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: typography.body,
    letterSpacing: 0.3,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: typography.body,
  },
});
