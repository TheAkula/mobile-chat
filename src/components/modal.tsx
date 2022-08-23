import { ReactNode } from "react";
import { Modal, ModalProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ModalProps {
  children: ReactNode;
}

export const ModalView = ({ children, ...rest }: Props) => {
  return (
    <Modal transparent animationType="slide" {...rest}>
      <ModalBackdrop>
        <ModalInner>{children}</ModalInner>
      </ModalBackdrop>
    </Modal>
  );
};

const ModalInner = styled.ScrollView`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.blue[6]};
  max-width: calc(100vh - 20px);
  max-height: calc(100vh - 20px);
`;

const ModalBackdrop = styled.View`
  background-color: ${({ theme }) => theme.colors.black[0]};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
