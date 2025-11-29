import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii, spacing } from "~/theme";

export default function FAB({
  label = "+",
  onPress,
}: {
  label?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const SIZE = 56;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    width: SIZE,
    height: SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  label: { color: "white", fontWeight: "700", fontSize: 24, marginTop: -2 },
});
