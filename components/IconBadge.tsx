import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "~/theme";

export default function IconBadge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.surface2,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: colors.text, fontWeight: "600" },
});
