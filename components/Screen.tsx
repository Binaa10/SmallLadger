import React from "react";
import {
  SafeAreaView,
  View,
  ViewProps,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { colors, spacing } from "~/theme";

export default function Screen({
  style,
  children,
  scroll,
  contentContainerStyle,
  ...rest
}: ViewProps & {
  children?: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: any;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      {scroll ? (
        <ScrollView
          style={[styles.container]}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, style]} {...rest}>
          {children}
        </View>
      )}
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
