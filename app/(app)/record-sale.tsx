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
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Screen from "~/components/Screen";
import { colors, spacing, typography } from "~/theme";

export default function RecordSale() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("24 October, 2023");
  const [notes, setNotes] = useState("");

  const onBack = () => {
    router.back();
  };

  const onHelp = () => {
    // TODO: hook up contextual help
  };

  const onSubmit = () => {
    // TODO: integrate with real submission flow
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
        >
          <View style={styles.headerRow}>
            <Pressable onPress={onBack} hitSlop={12} style={styles.headerIcon}>
              <Feather name="chevron-left" size={24} color={colors.text} />
            </Pressable>
            <Text style={styles.title}>Record Sale</Text>
            <Pressable onPress={onHelp} hitSlop={12} style={styles.headerIcon}>
              <Feather name="help-circle" size={22} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Sale Amount</Text>
            <View style={styles.inputShell}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="$ 0.00"
                placeholderTextColor={colors.muted}
                keyboardType="decimal-pad"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Product/Service Description</Text>
            <View style={styles.inputShell}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="e.g., 10kg Basmati Rice"
                placeholderTextColor={colors.muted}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Date of Sale</Text>
            <View style={styles.inputShellRow}>
              <TextInput
                editable={false}
                value={date}
                placeholder="24 October, 2023"
                placeholderTextColor={colors.muted}
                style={[styles.input, styles.flex]}
              />
              <Feather name="calendar" size={20} color={colors.muted} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <View style={[styles.inputShell, styles.inputMultiline]}>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="e.g., Paid via bank transfer"
                placeholderTextColor={colors.muted}
                style={[styles.input, styles.multiline]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.ctaContainer}>
          <Pressable style={styles.ctaButton} onPress={onSubmit}>
            <Text style={styles.ctaText}>Record Sale</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111d2b",
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "600",
  },
  inputShell: {
    backgroundColor: "#101c2b",
    borderColor: "#1f2f40",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputShellRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101c2b",
    borderColor: "#1f2f40",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  inputMultiline: {
    paddingVertical: spacing.lg,
  },
  input: {
    color: colors.text,
    fontSize: typography.body,
  },
  multiline: {
    minHeight: 110,
  },
  ctaContainer: {
    paddingVertical: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md + 4,
    borderRadius: 22,
  },
  ctaText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: typography.body,
  },
});
