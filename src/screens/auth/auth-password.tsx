import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { Container, Input, Button } from "src/components";
import {
  MyInfoDocument,
  MyInfoQuery,
  useCreatePasswordMutation,
} from "src/generated/graphql";
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
  const [createPassword, { loading }] = useCreatePasswordMutation({
    update(client, { data }) {
      if (data) {
        client.writeQuery<MyInfoQuery>({
          query: MyInfoDocument,
          data: {
            myUserInfo: data.createUserPassword,
          },
        });
      }
    },
  });

  const onSubmit = async (data: AuthPasswordForm) => {
    if (!loading) {
      await createPassword({
        variables: {
          password: data.password,
        },
      });
    }
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
            {loading ? <ActivityIndicator /> : "Save"}
          </Button>
        </Container>
      </ButtonContainer>
    </AuthContainer>
  );
};
