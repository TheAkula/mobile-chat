import styled from "styled-components/native";

interface Props {
  title: string;
}

export const MessagesListHeader = ({ title }: Props) => {
  return (
    <Container>
      <Line />
      <Title>{title}</Title>
      <Line />
    </Container>
  );
};

const Container = styled.View`
  height: 20px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  margin-left: 16px;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.white[1]};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.small};
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.white[1]};
`;
