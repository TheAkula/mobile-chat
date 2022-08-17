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
import { useSignUpWith2faMutation } from "src/generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "src/constants";

type Props = StackScreenProps<AuthParamList, AuthRoute.AuthPhone>;

export const AuthEmail = ({ navigation }: Props) => {
  const [signUpWith2faMutation] = useSignUpWith2faMutation();
  const { push } = navigation;
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<AuthEmailForm>({
    resolver: yupResolver(authPhone),
    mode: "onChange",

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: AuthEmailForm) => {
    signUpWith2faMutation({
      variables: {
        email: data.email,
      },
      onError(err) {
        console.log(err);
      },
      async onCompleted(complData) {
        await AsyncStorage.setItem(
          AsyncStorageKey.USER_TOKEN,
          complData.signUpWith2fa.userToken
        );

        push(AuthRoute.AuthCode, {
          email: data.email,
          counter: complData.signUpWith2fa.counter,
        });
      },
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
