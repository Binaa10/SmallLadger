import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography, radii } from "~/theme";

interface SettingsItemBase {
  id: string;
  icon: string;
  label: string;
  section: string;
  onPress?: () => void;
  value?: string;
  toggle?: boolean;
}

export default function ProfileSettings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const appearance = "System"; // placeholder
  const language = "English"; // placeholder

  const items: SettingsItemBase[] = [
    {
      id: "personal",
      icon: "person",
      label: "Personal Details",
      section: "Account",
      onPress: () => {},
    },
    {
      id: "contact",
      icon: "call",
      label: "Contact Information",
      section: "Account",
      onPress: () => {},
    },
    {
      id: "password",
      icon: "lock",
      label: "Change Password",
      section: "Account",
      onPress: () => router.push("/(auth)/forgot-password"),
    },
    {
      id: "notifications",
      icon: "notifications",
      label: "Notifications",
      section: "Preferences",
      toggle: true,
    },
    {
      id: "appearance",
      icon: "brightness-4",
      label: "Appearance",
      section: "Preferences",
      value: appearance,
      onPress: () => {},
    },
    {
      id: "language",
      icon: "language",
      label: "Language",
      section: "Preferences",
      value: language,
      onPress: () => {},
    },
    {
      id: "support",
      icon: "help",
      label: "Help & Support",
      section: "Support & Legal",
      onPress: () => {},
    },
    {
      id: "terms",
      icon: "gavel",
      label: "Terms of Service",
      section: "Support & Legal",
      onPress: () => {},
    },
    {
      id: "privacy",
      icon: "security",
      label: "Privacy Policy",
      section: "Support & Legal",
      onPress: () => {},
    },
  ];

  const sections = ["Account", "Preferences", "Support & Legal"];

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
          <Text style={styles.headerTitle}>Profile & Settings</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              /* TODO edit profile */
            }}
          >
            <Text style={styles.editLink}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={styles.name}>Jordan Smith</Text>
          <Text style={styles.role}>Trader</Text>
        </View>

        {sections.map((section) => (
          <View key={section} style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>{section}</Text>
            <View style={styles.sectionCard}>
              {items
                .filter((i) => i.section === section)
                .map((item, idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={item.onPress}
                      style={({ pressed }) => [
                        styles.row,
                        !isLast && styles.rowDivider,
                        pressed && { backgroundColor: "#142433" },
                      ]}
                    >
                      <View style={styles.rowLeft}>
                        <View style={styles.iconBadge}>
                          <MaterialIcons
                            name={item.icon as any}
                            size={18}
                            color={colors.primary}
                          />
                        </View>
                        <Text style={styles.rowLabel}>{item.label}</Text>
                      </View>
                      {item.toggle ? (
                        <Switch
                          value={notificationsEnabled}
                          onValueChange={setNotificationsEnabled}
                          trackColor={{
                            false: "#1f2d3a",
                            true: colors.primary,
                          }}
                          thumbColor={"#ffffff"}
                        />
                      ) : item.value ? (
                        <Text style={styles.valueText}>{item.value}</Text>
                      ) : (
                        <MaterialIcons
                          name="chevron-right"
                          size={20}
                          color={colors.muted}
                        />
                      )}
                    </Pressable>
                  );
                })}
            </View>
          </View>
        ))}

        <Pressable
          style={styles.logoutBtn}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
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
  editLink: { color: colors.primary, fontWeight: "600" },
  profileCard: {
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surface2,
    padding: spacing.lg,
    borderRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#162635",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  avatarText: { color: colors.text, fontSize: 40, fontWeight: "700" },
  name: { color: colors.text, fontSize: typography.h2, fontWeight: "700" },
  role: { color: colors.muted },
  sectionBlock: { gap: spacing.sm },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: typography.h3,
  },
  sectionCard: {
    backgroundColor: colors.surface2,
    borderRadius: 24,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: "#142b4a",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { color: colors.text, fontWeight: "600" },
  valueText: { color: colors.muted, fontWeight: "600" },
  logoutBtn: {
    alignSelf: "center",
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  logoutText: { color: colors.danger, fontWeight: "700" },
});
