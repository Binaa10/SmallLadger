import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "~/theme";
import BrandCube from "~/components/BrandCube";

export default function Splash() {
  const router = useRouter();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => {
      loop.stop();
      pulse.stopAnimation();
    };
  }, [pulse]);

  useEffect(() => {
    const t = setTimeout(() => router.replace("/onboarding"), 900);
    return () => clearTimeout(t);
  }, [router]);

  const { glowScale, glowOpacity, iconScale } = useMemo(() => {
    return {
      glowScale: pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.15],
      }),
      glowOpacity: pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0.45],
      }),
      iconScale: pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.06],
      }),
    };
  }, [pulse]);

  return (
    <View style={styles.screen}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <BrandCube size={108} color="#1e6bd8" strokeWidth={3} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#050a11",
  },
  glow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
});
