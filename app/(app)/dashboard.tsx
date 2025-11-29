import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Screen from "~/components/Screen";
import Card from "~/components/Card";
import ListItem from "~/components/ListItem";
import FAB from "~/components/FAB";
import { colors, radii, spacing, typography } from "~/theme";

export default function Dashboard() {
  const stats = useMemo(
    () => [
      {
        label: "Total Sales",
        value: "₹1,45,230",
        delta: "+5.2%",
        deltaColor: "#32d583",
      },
      {
        label: "Outstanding IOUs",
        value: "₹22,800",
        delta: "+1.8%",
        deltaColor: "#32d583",
      },
    ],
    []
  );

  const activities = useMemo(
    () => [
      {
        title: "Sale to Priya Sharma",
        subtitle: "Today, 10:45 AM",
        amount: "+₹5,200",
        tint: "#1a3d2a",
        icon: "arrow-upward",
        iconColor: "#34d399",
        amountColor: "#34d399",
      },
      {
        title: "Office Supplies Purchase",
        subtitle: "Yesterday, 3:15 PM",
        amount: "-₹1,850",
        tint: "#3a1b1f",
        icon: "arrow-downward",
        iconColor: "#f87171",
        amountColor: "#f87171",
      },
      {
        title: "IOU created for Anil Kumar",
        subtitle: "Yesterday, 11:00 AM",
        amount: "₹12,000",
        tint: "#142b4a",
        icon: "receipt-long",
        iconColor: colors.primary,
        amountColor: colors.text,
      },
      {
        title: "Payment from Rohan...",
        subtitle: "2 days ago, 9:30 AM",
        amount: "+₹8,000",
        tint: "#1a3d2a",
        icon: "arrow-upward",
        iconColor: "#34d399",
        amountColor: "#34d399",
      },
      {
        title: "Transport Expense",
        subtitle: "3 days ago, 6:00 PM",
        amount: "-₹600",
        tint: "#3a1b1f",
        icon: "arrow-downward",
        iconColor: "#f87171",
        amountColor: "#f87171",
      },
    ],
    []
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable style={styles.iconButton}>
            <Feather name="menu" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Pressable style={styles.iconButton}>
            <Feather name="user" size={22} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>Good morning, Trader</Text>
        </View>

        <View style={styles.statRow}>
          {stats.map((stat) => (
            <Card key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[styles.statDelta, { color: stat.deltaColor }]}>
                {stat.delta}
              </Text>
            </Card>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable hitSlop={8}>
            <Text style={styles.sectionLink}>View All</Text>
          </Pressable>
        </View>

        <Card style={styles.activityCard}>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.title}
              title={activity.title}
              subtitle={activity.subtitle}
              left={
                <View
                  style={[styles.iconBadge, { backgroundColor: activity.tint }]}
                >
                  <MaterialIcons
                    name={activity.icon as any}
                    size={20}
                    color={activity.iconColor}
                  />
                </View>
              }
              right={
                <Text style={[styles.amount, { color: activity.amountColor }]}>
                  {activity.amount}
                </Text>
              }
              style={
                index === activities.length - 1 ? styles.lastItem : undefined
              }
            />
          ))}
        </Card>
      </ScrollView>

      <FAB
        label="+"
        onPress={() => {
          /* TODO: open create transaction */
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 140,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#101b2a",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  greetingBlock: {
    marginTop: spacing.sm,
  },
  greeting: {
    color: colors.text,
    fontSize: typography.h1 + 6,
    fontWeight: "800",
  },
  statRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#101f32",
    borderColor: "#1c2d45",
    borderRadius: 20,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  statLabel: {
    color: colors.muted,
    fontSize: typography.small,
    marginBottom: spacing.sm,
  },
  statValue: {
    color: colors.text,
    fontSize: typography.h1 + 4,
    fontWeight: "800",
  },
  statDelta: {
    marginTop: 6,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "700",
  },
  sectionLink: {
    color: colors.primary,
    fontWeight: "600",
  },
  activityCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
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
});
