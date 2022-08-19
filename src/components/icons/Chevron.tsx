import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const Chevron = ({ color }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m8.288 12 6.01 6.01 1.414-1.414-4.6-4.6 4.6-4.6-1.414-1.406L8.288 12Z"
      fill={color || "#0F1828"}
    />
  </Svg>
);
