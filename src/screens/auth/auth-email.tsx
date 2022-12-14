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
import { authEmail } from "src/utils";
import { AuthEmailForm } from "src/types";
import { useSignUpWith2faMutation } from "src/generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "src/constants";
import { ActivityIndicator } from "react-native";

type Props = StackScreenProps<AuthParamList, AuthRoute.AuthEmail>;

export const AuthEmail = ({ navigation }: Props) => {
  const [signupWith2fa, { loading }] = useSignUpWith2faMutation();
  const { push } = navigation;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthEmailForm>({
    resolver: yupResolver(authEmail),
    mode: "onChange",

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: AuthEmailForm) => {
    if (!loading) {
      const response = await signupWith2fa({
        variables: { email: data.email },
      });

      await AsyncStorage.setItem(
        AsyncStorageKey.USER_TOKEN,
        response.data?.signUpWith2fa.userToken || ""
      );

      push(AuthRoute.AuthCode, {
        email: data.email,
        counter: response.data?.signUpWith2fa.counter || 0,
      });
    }
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
            {loading ? <ActivityIndicator /> : "Continue"}
          </Button>
        </Container>
      </ButtonContainer>
    </AuthContainer>
  );
};
