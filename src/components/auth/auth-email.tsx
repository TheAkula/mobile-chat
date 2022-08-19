import {
  Description,
  Title,
  Wrapper,
  AuthContainer,
  MainContainer,
  ButtonContainer,
} from "./styles";
import { Input, Container, Button } from "src/components";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthRoute, AuthParamList } from "src/navigation/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authPhone } from "src/utils";
import { AuthEmailForm } from "src/types";
import { useSignupWith2fa } from "src/models";

type Props = StackScreenProps<AuthParamList, AuthRoute.AuthPhone>;

export const AuthEmail = ({ navigation }: Props) => {
  const signupWith2fa = useSignupWith2fa();
  const { push } = navigation;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthEmailForm>({
    resolver: yupResolver(authPhone),
    mode: "onChange",

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: AuthEmailForm) => {
    const response = await signupWith2fa({ email: data.email });
    push(AuthRoute.AuthCode, {
      email: data.email,
      counter: response.data?.signUpWith2fa.counter || 0,
    });
  };

  return (
    <AuthContainer>
      <MainContainer>
        <Wrapper>
          <Title>Enter Your Email</Title>
          <Description>Please enter your email address</Description>
        </Wrapper>
        <Container>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                keyboardType="email-address"
                placeholder="Email"
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
