import { ReactNode, useState } from "react";
import {
  GestureResponderEvent,
  Touchable,
  TouchableWithoutFeedbackProps,
} from "react-native";
import { TouchableProps } from "react-native-svg";
import styled, { css } from "styled-components/native";
import { switchProp } from "styled-tools";

interface Props {
  variant?: "primary" | "secondary" | "ghost";
  status?: "disabled" | "hover" | "focus" | "initial";
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  children,
  status = "initial",
  onPressIn,
  onPressOut,
  ...rest
}: Props & TouchableProps) => {
  const [pressed, setPressed] = useState(false);
  const handlePressIn = (e: GestureResponderEvent) => {
    onPressIn && onPressIn(e);
    setPressed(true);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    onPressOut && onPressOut(e);
    setPressed(false);
  };

  const sts = rest.disabled ? "disabled" : pressed ? "focus" : status;

  return (
    <StyledButton
      {...rest}
      variant={variant}
      status={sts}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <StyledText variant={variant} status={sts}>
        {children}
      </StyledText>
    </StyledButton>
  );
};

const StyledText = styled.Text<Props>`
  font-size: ${({ theme }) => theme.fontSizes.medium};

  ${({ theme }) =>
    switchProp("variant", {
      primary: css`
        color: ${theme.colors.white[0]};
      `,
      secondary: css`
        color: ${theme.colors.blue[1]};
      `,
      ghost: css`
        color: ${theme.colors.blue[1]};
      `,
    })}
`;

const StyledButton = styled.Pressable<Props>`
  border-radius: 30px;
  padding: 12px 48px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-width: 2px;
  border-style: solid;

  ${({ theme }) =>
    switchProp("variant", {
      primary: css`
        background-color: ${theme.colors.blue[1]};
        border-color: ${theme.colors.blue[1]};
        ${switchProp("status", {
          hover: css`
            background-color: ${theme.colors.blue[0]};
            border-color: ${theme.colors.blue[0]};
          `,
          focus: css`
            /* box-shadow: 0 0 8px 8px ${theme.colors.blue[4]}; */
            shadow-color: ${theme.colors.white[4]};
            shadow-radius: 8px;
          `,
          disabled: css`
            opacity: 0.5;
          `,
        })}
      `,
      secondary: css`
        background-color: ${theme.colors.transparent};
        border-color: ${theme.colors.blue[1]};
        ${switchProp("status", {
          hover: css`
            background-color: ${theme.colors.blue[0]};
            border-color: ${theme.colors.blue[0]};
            color: ${theme.colors.blue[0]};
          `,
          focus: css`
            border-width: 1px;
            /* box-shadow: 0 0 8px 8px ${theme.colors.white[0]}; */
            shadow-color: ${theme.colors.white[0]};
            shadow-radius: 8px;
          `,
          disabled: css`
            opacity: 0.5;
          `,
        })}
      `,
      ghost: css`
        background-color: ${theme.colors.transparent};
        border-color: ${theme.colors.transparent};
        ${switchProp("status", {
          hover: css`
            background-color: ${theme.colors.blue[0]};
            border-color: ${theme.colors.blue[0]};
            color: ${theme.colors.blue[0]};
          `,
          focus: css`
            /* box-shadow: 0 0 8px 8px ${theme.colors.white[0]}; */
            shadow-color: ${theme.colors.white[0]};
            shadow-radius: 8px;
            background-color: ${theme.colors.white[1]};
          `,
          disabled: css`
            opacity: 0.5;
          `,
        })}
      `,
    })}
`;
