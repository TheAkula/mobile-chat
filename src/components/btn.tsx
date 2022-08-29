import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface Props {
  children: ReactNode;
  pressed: () => void;
}

export const Btn = ({ children, pressed }: Props) => {
  return (
    <TouchableOpacity onPress={pressed}>
      <Button>{children}</Button>
    </TouchableOpacity>
  );
};

const Button = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[2]};
  border-radius: 6px;
  padding: 5px 10px;
  align-items: center;
`;
