import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { AuthRoute, AuthParamList } from "src/navigation/types";
import { Container, Input, Button } from "src/components";
import {
  AuthContainer,
  ButtonContainer,
  Description,
  MainContainer,
  Title,
  Wrapper,
} from "./styles";
import styled from "styled-components/native";
import { useEffect, useRef, useState } from "react";
import { ifProp } from "styled-tools";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { useConfirmSignUpWith2faMutation } from "src/generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "src/constants";

type Props = StackScreenProps<AuthParamList, AuthRoute.AuthCode>;

export const AuthCode = ({ navigation, route: { params } }: Props) => {
  const [code, setCode] = useState<(string | undefined)[]>([...new Array(6)]);
  const { navigate } = navigation;
  const { email, counter } = params;
  const [isFull, setIsFull] = useState(false);
  const inputRef = useRef<TextInput>();
  const [confirmSignUp] = useConfirmSignUpWith2faMutation();

  useEffect(() => {
    const nums = code.map((c) => (c ? c : "")).join("");
    if (nums.length === 6) {
      setIsFull(true);
      Keyboard.dismiss();
      confirmSignUp({
        variables: {
          counter,
          code: +nums,
        },
        async onCompleted(data) {
          await AsyncStorage.setItem(
            AsyncStorageKey.USER_TOKEN,
            data.confirmSignUpWith2fa.userToken || ""
          );
          navigate(AuthRoute.AuthProfile);
        },
        onError(err) {
          console.log(err);
        },
      });
    }
  }, [code]);

  const handleFocus = () => {
    inputRef.current?.blur();
    inputRef.current?.focus();
  };

  const handleChange = (textValue: string) => {
    if (!isFull) {
      setCode(textValue.split("").concat([...new Array(6 - textValue.length)]));
    }
  };

  return (
    <AuthContainer>
      <MainContainer>
        <Wrapper>
          <Title>Enter Code</Title>
          <Description>
            We have sent you an email with the code to {email}
          </Description>
        </Wrapper>
        <Container>
          <TouchableWithoutFeedback onPress={handleFocus}>
            <NumbersContainer>
              {code.map((num, i) => (
                <NumberContainer key={i} last={i === code.length - 1}>
                  {num ? <Number>{num}</Number> : <Circle />}
                </NumberContainer>
              ))}
            </NumbersContainer>
          </TouchableWithoutFeedback>
          <StyledTextInput
            value={code.map((c) => (c ? c : "")).join("")}
            onChangeText={handleChange}
            blurOnSubmit={false}
            ref={inputRef}
            autoFocus
            keyboardShouldPersistTaps="always"
            keyboardType="number-pad"
          />
        </Container>
      </MainContainer>
      <ButtonContainer>
        <Container>
          <StyledText>Resend Code</StyledText>
        </Container>
      </ButtonContainer>
    </AuthContainer>
  );
};

const StyledText = styled.Text`
  margin: auto;
  color: ${({ theme }) => theme.colors.white[0]};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: ${({ theme }) => theme.lineHeights.medium};
`;

const Circle = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.blue[6]};
`;

const NumberContainer = styled.View<{ last?: boolean }>`
  width: 32px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: ${ifProp("last", "0", "20px")};
`;

const Number = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const NumbersContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  opacity: 0;
`;
