import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { Chevron } from "./icons";
import { AppTheme } from "src/theme";

interface Props {
  back?: boolean;
}

export const Header = ({ back }: Props) => {
  const { goBack } = useNavigation();

  return (
    <StyledHeader>
      {back && (
        <TouchableWithoutFeedback onPress={goBack}>
          <Chevron color={AppTheme.colors.white[0]} />
        </TouchableWithoutFeedback>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.View`
  padding: 0 16px 19px 16px;
  flex-direction: row;
  justify-content: space-between;
`;
