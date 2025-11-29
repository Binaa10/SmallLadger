import React from "react";
import Svg, { Path } from "react-native-svg";

interface BrandCubeProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export default function BrandCube({
  size = 96,
  color = "#1e6bd8",
  strokeWidth = 2.8,
}: BrandCubeProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Path
        d="M32 6 10 17l22 11 22-11L32 6Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M10 17v22l22 11V28L10 17Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M54 17v22L32 50V28l22-11Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="m32 28 12-6v12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m32 28-12-6v12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M32 28v22"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
