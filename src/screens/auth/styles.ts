import styled from "styled-components/native";

export const Title = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.big};
  color: ${({ theme }) => theme.colors.white[0]};

  margin-bottom: 8px;
`;

export const Description = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

export const Wrapper = styled.View`
  padding-left: 40px;
  padding-right: 40px;

  margin-bottom: 48px;
`;

export const AuthContainer = styled.View`
  justify-content: space-between;
  flex: 1;
`;

export const MainContainer = styled.View`
  margin-top: 80px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 32px;
`;
