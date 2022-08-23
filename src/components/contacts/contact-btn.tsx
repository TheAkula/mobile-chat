import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface Props {
  children: ReactNode;
  pressed: () => void;
}

export const ContactBtn = ({ children, pressed }: Props) => {
  return (
    <TouchableOpacity onPress={pressed}>
      <Btn>{children}</Btn>
    </TouchableOpacity>
  );
};

const Btn = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[2]};
  border-radius: 6px;
  padding: 5px 10px;
`;
