import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const Chats = ({ width, height }: SvgProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 4a6.667 6.667 0 1 0 0 13.333A6.667 6.667 0 0 0 12 4Zm-4 6.667a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM22.544 10.958a2.667 2.667 0 0 0-1.21-.291V8a5.333 5.333 0 1 1-3.143 9.642h-.002l1.572-2.155a2.667 2.667 0 1 0 2.784-4.53ZM26.664 28a5.33 5.33 0 0 0-5.33-5.33V20a8.002 8.002 0 0 1 8 8h-2.67ZM21.333 28h-2.666a6.667 6.667 0 1 0-13.334 0H2.667A9.333 9.333 0 0 1 12 18.667 9.333 9.333 0 0 1 21.333 28Z"
      fill="#F7F7FC"
    />
  </Svg>
);
