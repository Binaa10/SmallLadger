import React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
  Path,
  Circle,
  G,
} from "react-native-svg";

interface OnboardingIllustrationProps {
  width?: number;
  height?: number;
}

export default function OnboardingIllustration({
  width = 320,
  height = 220,
}: OnboardingIllustrationProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 220">
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0e2130" />
          <Stop offset="1" stopColor="#133648" />
        </LinearGradient>
        <LinearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#117d9b" />
          <Stop offset="1" stopColor="#34d0ff" />
        </LinearGradient>
        <LinearGradient id="phone" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ced9e5" stopOpacity="0.8" />
          <Stop offset="1" stopColor="#8aa1b8" stopOpacity="0.9" />
        </LinearGradient>
        <LinearGradient id="glow" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#0d6ddf" stopOpacity="0.1" />
          <Stop offset="1" stopColor="#0d6ddf" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>

      <Rect width="320" height="220" rx="24" fill="url(#bg)" />

      <Rect
        x="28"
        y="156"
        width="264"
        height="30"
        rx="14"
        fill="#0c1b27"
        opacity="0.5"
      />

      <Rect x="40" y="150" width="240" height="26" rx="13" fill="url(#phone)" />
      <Rect x="120" y="158" width="80" height="6" rx="3" fill="#1f2935" />

      <Rect
        x="40"
        y="36"
        width="240"
        height="118"
        rx="22"
        fill="url(#glow)"
        opacity="0.8"
      />

      <G opacity="0.2">
        <Path
          d="M46 128h228"
          stroke="#1f5a7d"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />
        <Path
          d="M46 102h228"
          stroke="#1f5a7d"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />
        <Path
          d="M46 76h228"
          stroke="#1f5a7d"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />
      </G>

      {[34, 58, 72, 94, 110, 86, 100, 132, 144, 128].map(
        (heightValue, index) => {
          const barWidth = 16;
          const spacing = 20;
          const baseX = 60 + index * spacing;
          const barHeight = heightValue;
          return (
            <Rect
              key={index}
              x={baseX}
              y={150 - barHeight}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill="url(#bar)"
              opacity={0.9 - index * 0.04}
            />
          );
        }
      )}

      <Path
        d="M60 120c12-18 24-24 36-20s24 20 36 18 24-30 36-30 24 28 36 32 24-8 36-24 24-24 36-14"
        stroke="#8df1ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />

      <Circle cx="280" cy="92" r="4" fill="#8df1ff" />
    </Svg>
  );
}
