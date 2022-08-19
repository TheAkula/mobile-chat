import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Container, Input, Button } from "src/components";
import { useUpdateProfile } from "src/models";
import { AuthPassword as AuthPasswordForm } from "src/types";
import { authPassword } from "src/utils";
import {
  AuthContainer,
  ButtonContainer,
  Description,
  MainContainer,
  Title,
  Wrapper,
} from "./styles";

export const AuthPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthPasswordForm>({
    mode: "all",
    resolver: yupResolver(authPassword),
  });
  const updateProfile = useUpdateProfile();

  const onSubmit = async (data: AuthPasswordForm) => {
    await updateProfile({
      password: data.password,
    });
  };

  return (
    <AuthContainer>
      <MainContainer>
        <Wrapper>
          <Title>Create Password</Title>
          <Description>Please create password for your account</Description>
        </Wrapper>
        <Container>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
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
