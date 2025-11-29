import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography } from "~/theme";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onLogin = () => {
    // TODO: replace with real auth
    router.replace("/(app)/dashboard");
  };

  const onForgotPassword = () => {
    // TODO: hook up reset flow
  };

  const onContactSupport = () => {
    // TODO: route to support
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>trending_up</Text>
        </View>
        <Text style={styles.title}>Trader Login</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username or Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Enter your username or email"
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
              placeholder="Enter your password"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable
              onPress={() => setPasswordVisible((prev) => !prev)}
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

        <Pressable onPress={onForgotPassword} hitSlop={8}>
          <Text style={styles.link}>Forgot Password?</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryText}>Log In</Text>
        </Pressable>

        <Text style={styles.orText}>Or log in with</Text>

        <Pressable style={styles.faceIdButton} onPress={() => {}}>
          <MaterialIcons
            name="face"
            size={20}
            color={colors.text}
            style={{ marginRight: spacing.sm }}
          />
          <Text style={styles.faceIdText}>Login with Face ID</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.link} onPress={onContactSupport}>
            Contact Support
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
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
    alignSelf: "flex-end",
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
  orText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.lg,
  },
  faceIdButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderColor: "#1c2a3d",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  faceIdText: {
    color: colors.text,
    fontSize: typography.body,
  },
  footerText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});
