import { colors } from "./colors";

export const AppTheme = {
  colors,
  fontSizes: {
    large: "32px",
    big: "24px",
    semiBig: "18px",
    medium: "16px",
    normal: "14px",
    small: "12px",
    superSmall: "10px",
  },
  lineHeights: {
    large: "auto",
    big: "auto",
    semiBig: "30px",
    medium: "28px",
    normal: "24px",
    small: "20px",
    superSmall: "16px",
  },
};

type ThemeType = typeof AppTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
