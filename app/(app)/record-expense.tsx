import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import DropdownField from "~/components/DropdownField";
import { colors, spacing, typography } from "~/theme";

const CATEGORY_OPTIONS = [
  "Office Supplies",
  "Fuel & Transport",
  "Inventory Purchase",
  "Utilities",
  "Staff Wages",
  "Miscellaneous",
];

export default function RecordExpense() {
  const router = useRouter();
  const [amount, setAmount] = useState("$0.00");
  const [category, setCategory] = useState<string | undefined>();
  const [note, setNote] = useState("");

  const onClose = () => router.back();

  const onSave = () => {
    // TODO: wire up persistence when backend is ready
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Pressable onPress={onClose} hitSlop={12} style={styles.iconButton}>
              <Feather name="x" size={22} color={colors.text} />
            </Pressable>
            <Text style={styles.title}>Record Expense</Text>
            <View style={styles.iconPlaceholder} />
          </View>

          <View style={styles.amountBlock}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              style={styles.amountInput}
            />
            <Text style={styles.amountLabel}>Amount</Text>
          </View>

          <View style={styles.fieldGroup}>
            <DropdownField
              label="Category"
              placeholder="Select a category"
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={setCategory}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Date</Text>
            <Pressable style={styles.inputShell}>
              <Text style={styles.valueText}>December 18, 2023</Text>
              <Feather name="calendar" size={20} color={colors.muted} />
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Note</Text>
            <View style={[styles.inputShell, styles.noteShell]}>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Add a short description (optional)"
                placeholderTextColor={colors.muted}
                style={[styles.input, styles.noteInput]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Expense</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111d2b",
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  amountBlock: {
    alignItems: "center",
    gap: spacing.xs,
  },
  amountInput: {
    color: colors.primary,
    fontSize: typography.h1 + 18,
    fontWeight: "800",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  amountLabel: {
    color: colors.muted,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "600",
  },
  inputShell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1f252f",
    borderColor: "#313949",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  valueText: {
    color: colors.text,
    fontSize: typography.body,
  },
  noteShell: {
    paddingVertical: spacing.lg,
    minHeight: 120,
  },
  input: {
    color: colors.text,
    fontSize: typography.body,
  },
  noteInput: {
    flex: 1,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: spacing.md + 4,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: typography.body,
  },
});
