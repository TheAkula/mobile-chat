import { Route, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Chevron } from "./icons";
import { AppTheme } from "src/theme";
import { ReactNode } from "react";
import { getHeaderTitle, HeaderTitleProps } from "@react-navigation/elements";
import { getTitle } from "src/utils";

type Props = {
  back?: boolean;
  buttons?: ReactNode;
  options: {
    title?: string | undefined;
    headerTitle?: string | ((props: HeaderTitleProps) => ReactNode) | undefined;
  };
  route: Route<any, any>;
};

export const Header = ({ back, buttons, options, route }: Props) => {
  const { goBack } = useNavigation();

  const title = options.title || getTitle(getHeaderTitle(options, route.name));

  const handlePress = () => {
    goBack();
  };

  return (
    <StyledHeader>
      <Wrapper>
        {back && (
          <TouchableOpacity onPress={handlePress}>
            <Chevron color={AppTheme.colors.white[0]} />
          </TouchableOpacity>
        )}
        {!!title && <Title>{title}</Title>}
      </Wrapper>
      <Wrapper>{buttons}</Wrapper>
    </StyledHeader>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledHeader = styled.View`
  padding: 20px 16px 19px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  padding-left: 8px;
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};
`;
