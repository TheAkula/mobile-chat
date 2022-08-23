import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Container, Input, Button } from "src/components";
import { useSignin } from "src/models";
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
  const signin = useSignin();

  const onSubmit = (data: AuthSignInForm) => {
    signin({
      email: data.email,
      password: data.password,
    });
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
            Continue
          </Button>
        </Container>
      </ButtonContainer>
    </AuthContainer>
  );
};

const StyledInput = styled(Input)`
  margin-bottom: 12px;
`;
