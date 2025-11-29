import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { colors, spacing, typography } from "~/theme";

export default function ListItem({
  title,
  subtitle,
  right,
  left,
  style,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  return (
    <View style={[styles.row, style]}>
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  left: {
    marginRight: spacing.md,
  },
  texts: { flex: 1 },
  title: { color: colors.text, fontSize: typography.body, fontWeight: "600" },
  subtitle: { color: colors.muted, marginTop: 4 },
});
