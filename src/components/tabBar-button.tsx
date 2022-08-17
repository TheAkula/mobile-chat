import styled from "styled-components/native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

interface Props extends BottomTabBarButtonProps {
  title: string;
  active?: boolean;
}

export const TabBarButton = ({ title, onPress, active, children }: Props) => {
  return (
    <StyledButton onPress={onPress}>
      {active ? (
        <>
          <Title>{title}</Title>
          <Circle />
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  width: 58px;
  padding: 6px 0;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
  margin-bottom: 4px;
`;

const Circle = styled.View`
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.white[0]};
  border-radius: 2px;
  overflow: hidden;
`;
