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
import { colors, spacing, typography } from "~/theme";

export default function CreateIou() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [notes, setNotes] = useState("");

  const handleCancel = () => router.back();

  const handleCreate = () => {
    // TODO: persist IOU submission when backend is available
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
            <Pressable hitSlop={10} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Text style={styles.title}>Create IOU</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Customer Name</Text>
            <View style={styles.inputShell}>
              <Feather name="user" size={18} color={colors.muted} />
              <TextInput
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Enter customer's name"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputShell}>
              <Text style={styles.prefix}>$</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="$ 0.00"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Due Date</Text>
            <Pressable style={styles.inputShell}>
              <View style={styles.inlineRow}>
                <Feather name="calendar" size={18} color={colors.muted} />
                <Text
                  style={[styles.placeholderText, dueDate && styles.valueText]}
                >
                  {dueDate ?? "Select a date"}
                </Text>
              </View>
              <View style={styles.dateBadge}>
                <Feather name="chevron-right" size={18} color={colors.text} />
              </View>
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Notes</Text>
            <View style={[styles.inputShell, styles.notesShell]}>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add optional details..."
                placeholderTextColor={colors.muted}
                style={[styles.input, styles.notesInput]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.primaryButton} onPress={handleCreate}>
            <Text style={styles.primaryButtonText}>Create IOU</Text>
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
  cancelText: {
    color: "#2d8bff",
    fontWeight: "600",
    fontSize: typography.body,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  placeholder: {
    width: 52,
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
    gap: spacing.md,
    backgroundColor: "#0f1725",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1a293f",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
  },
  prefix: {
    color: colors.muted,
    fontSize: typography.body,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  placeholderText: {
    color: colors.muted,
    fontSize: typography.body,
  },
  valueText: {
    color: colors.text,
  },
  dateBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#22324a",
    alignItems: "center",
    justifyContent: "center",
  },
  notesShell: {
    alignItems: "flex-start",
    paddingVertical: spacing.lg,
    minHeight: 140,
  },
  notesInput: {
    minHeight: 110,
  },
  footer: {
    paddingVertical: spacing.md,
  },
  primaryButton: {
    backgroundColor: "#2d8bff",
    borderRadius: 24,
    paddingVertical: spacing.md + 4,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: typography.body,
  },
});
