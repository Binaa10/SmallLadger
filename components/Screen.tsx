import React from "react";
import {
  SafeAreaView,
  View,
  ViewProps,
  StyleSheet,
  StatusBar,
} from "react-native";
import { colors, spacing } from "~/theme";

export default function Screen({
  style,
  children,
  ...rest
}: ViewProps & { children?: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});
