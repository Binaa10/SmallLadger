import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography } from "~/theme";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const onSignup = () => {
    // TODO: hook up real signup
    if (!name || !email || !password || password !== confirm) {
      return;
    }
    router.replace("/(app)/dashboard");
  };

  const goLogin = () => router.replace("/(auth)/login");

  return (
    <Screen scroll contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>account_circle</Text>
        </View>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          </View>
        </View>

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

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              placeholder="Create a password"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable
              onPress={() => setPasswordVisible((p) => !p)}
              hitSlop={12}
            >
              <MaterialIcons
                name={passwordVisible ? "visibility-off" : "visibility"}
                size={22}
                color={colors.muted}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!confirmVisible}
              placeholder="Confirm your password"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable
              onPress={() => setConfirmVisible((p) => !p)}
              hitSlop={12}
            >
              <MaterialIcons
                name={confirmVisible ? "visibility-off" : "visibility"}
                size={22}
                color={colors.muted}
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={onSignup}>
          <Text style={styles.primaryText}>Sign Up</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={goLogin}>
            Log In
          </Text>
        </Text>
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
  badge: {
    alignSelf: "center",
    backgroundColor: "#0b1b2d",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 18,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1 + 6,
    fontWeight: "800",
    alignSelf: "center",
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
  footerText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});
