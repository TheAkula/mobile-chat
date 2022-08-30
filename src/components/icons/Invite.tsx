import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const Invite = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 20H4a2 2 0 0 1-2-2V5.913A2 2 0 0 1 4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2ZM4 7.868V18h16V7.868L12 13.2 4 7.868ZM4.8 6l7.2 4.8L19.2 6H4.8Z"
      fill="#F7F7FC"
    />
  </Svg>
);
