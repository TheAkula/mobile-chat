import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const MoreHorizontal = ({ color }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M18 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      fill={color || "#0F1828"}
    />
  </Svg>
);
