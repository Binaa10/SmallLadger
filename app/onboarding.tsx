import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Screen from "~/components/Screen";
import { colors, spacing, typography } from "~/theme";
import OnboardingIllustration from "~/components/OnboardingIllustration";

export default function Onboarding() {
  const router = useRouter();
  const features = useMemo(
    () => [
      {
        icon: "trending-up",
        title: "Real-time Tracking",
        subtitle: "Log all transactions instantly.",
      },
      {
        icon: "lock",
        title: "Secure Access",
        subtitle: "Manage user permissions with ease.",
      },
      {
        icon: "insert-chart-outlined",
        title: "Effortless Reporting",
        subtitle: "Generate insightful reports in seconds.",
      },
    ],
    []
  );

  const goToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandStack}>
          <View style={styles.brandBadge}>
            <MaterialCommunityIcons
              name="notebook-edit-outline"
              size={26}
              color={colors.text}
            />
          </View>
          <Text style={styles.brandName}>Microledger</Text>
        </View>

        <OnboardingIllustration width={320} height={220} />

        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle}>
            Simplify Ledger Management for Traders
          </Text>
          <Text style={styles.heroSubtitle}>
            Real-time tracking, secure access, and effortless reporting at your
            fingertips.
          </Text>
        </View>

        <View style={styles.featureStack}>
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureIconCircle}>
                <MaterialIcons
                  name={feature.icon as any}
                  size={22}
                  color="#42d59c"
                />
              </View>
              <View style={styles.featureCopy}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={goToLogin}>
          <Text style={styles.primaryText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={goToLogin} hitSlop={8}>
          <Text style={styles.loginLink}>
            Already have an account?{" "}
            <Text style={styles.loginLinkAccent}>Log In</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl * 2,
    gap: spacing.xl,
    alignItems: "center",
  },
  brandStack: {
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  brandBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#112742",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "700",
  },
  heroCopy: {
    gap: spacing.sm,
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  heroTitle: {
    color: colors.text,
    fontSize: typography.h1 + 6,
    fontWeight: "800",
    textAlign: "center",
  },
  heroSubtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    textAlign: "center",
  },
  featureStack: {
    gap: spacing.md,
    width: "100%",
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: "#0f1f30",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1b2f45",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#102b38",
    alignItems: "center",
    justifyContent: "center",
  },
  featureCopy: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: typography.body,
  },
  featureSubtitle: {
    color: colors.muted,
    fontSize: typography.small,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: spacing.lg - 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 8,
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: typography.body + 2,
  },
  loginLink: {
    textAlign: "center",
    color: colors.muted,
    fontWeight: "600",
  },
  loginLinkAccent: {
    color: colors.primary,
  },
  fullWidth: {
    width: "100%",
  },
});
