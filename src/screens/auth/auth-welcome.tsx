import { StackScreenProps } from "@react-navigation/stack";
import {
  Welcome as WelcomeIllustration,
  Container,
  Button,
} from "src/components";
import { AuthParamList, AuthRoute } from "src/navigation/types";
import styled from "styled-components/native";

type Props = StackScreenProps<AuthParamList, AuthRoute.AuthWelcome>;

export const Welcome = ({ navigation: { push } }: Props) => {
  return (
    <Root>
      <Wrapper>
        <IllustrationContainer>
          <WelcomeIllustration />
        </IllustrationContainer>
        <WelcomeText>
          Connect easily with your family and friends over countries
        </WelcomeText>
      </Wrapper>
      <Container>
        <ButtonContainer>
          <Button onPress={() => push(AuthRoute.AuthEmail)}>Sign up</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            variant="secondary"
            onPress={() => push(AuthRoute.AuthSignIn)}
          >
            Sign in
          </Button>
        </ButtonContainer>
      </Container>
    </Root>
  );
};

const Wrapper = styled.View`
  margin: 0 auto;
`;

const IllustrationContainer = styled.View`
  margin-bottom: 42px;
`;

const WelcomeText = styled.Text`
  max-width: 280px;
  font-size: ${({ theme }) => theme.fontSizes.big};
  color: ${({ theme }) => theme.colors.white[0]};
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin-bottom: 20px;
`;

const Root = styled.View`
  justify-content: space-between;
  flex: 1;
`;
