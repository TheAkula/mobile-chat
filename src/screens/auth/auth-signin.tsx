import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { Container, Input, Button } from "src/components";
import { AsyncStorageKey } from "src/constants";
import {
  MyInfoDocument,
  useMyInfoLazyQuery,
  useMyInfoQuery,
  useSigninMutation,
} from "src/generated/graphql";
import { AuthSignIn as AuthSignInForm } from "src/types";
import { authSignin } from "src/utils";
import styled from "styled-components/native";
import {
  AuthContainer,
  ButtonContainer,
  Description,
  MainContainer,
  Title,
  Wrapper,
} from "./styles";

export const AuthSignIn = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<AuthSignInForm>({
    mode: "all",
    resolver: yupResolver(authSignin),
  });
  const [fetchInfo, { loading }] = useMyInfoLazyQuery();
  const [signin] = useSigninMutation();

  const onSubmit = async (data: AuthSignInForm) => {
    if (!loading) {
      const response = await signin({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      await AsyncStorage.setItem(
        AsyncStorageKey.USER_TOKEN,
        response.data?.login.userToken || ""
      );

      await fetchInfo();
    }
  };

  return (
    <AuthContainer>
      <MainContainer>
        <Wrapper>
          <Title>Enter Your Email and Password</Title>
          <Description>
            Please enter your email address and password
          </Description>
        </Wrapper>
        <Container>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                keyboardType="email-address"
                placeholder="Email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                onChangeText={onChange}
                type="password"
                value={value}
                onBlur={onBlur}
                placeholder="Password"
              />
            )}
          />
        </Container>
      </MainContainer>
      <ButtonContainer>
        <Container>
          <Button disabled={!isValid} onPress={handleSubmit(onSubmit)}>
            {loading ? <ActivityIndicator /> : "Continue"}
          </Button>
        </Container>
      </ButtonContainer>
    </AuthContainer>
  );
};

const StyledInput = styled(Input)`
  margin-bottom: 12px;
`;
