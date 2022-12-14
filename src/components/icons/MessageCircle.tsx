import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const MessageCircle = ({ color }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="m8.051 17.828.654.35a6.96 6.96 0 0 0 3.292.822H12a7 7 0 1 0-7-7v.003a6.96 6.96 0 0 0 .822 3.292l.35.654-.538 2.417 2.417-.538ZM3 21l1.058-4.762A9 9 0 0 1 12 3a9 9 0 0 1 9 9 9 9 0 0 1-13.238 7.942L3 21Z"
      fill={color || "#0F1828"}
    />
  </Svg>
);
