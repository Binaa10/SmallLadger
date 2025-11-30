import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography } from "~/theme";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    // TODO: integrate actual password reset request
    router.back();
  };

  return (
    <Screen scroll contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send a reset link.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={onSubmit}>
          <Text style={styles.primaryText}>Send Reset Link</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Text style={styles.link}>Back to Login</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: "center",
    minHeight: "100%",
  },
  content: {
    width: "100%",
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1 + 2,
    fontWeight: "800",
    alignSelf: "center",
  },
  subtitle: {
    color: colors.muted,
    textAlign: "center",
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.muted,
    fontSize: typography.small,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101a29",
    borderColor: "#1c2a3d",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    paddingVertical: 4,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
    alignSelf: "center",
  },
  primaryButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    elevation: 6,
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: typography.body,
  },
});
