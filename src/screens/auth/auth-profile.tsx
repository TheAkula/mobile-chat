import { Image } from "react-native";
import {
  ImageInfo,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import styled from "styled-components/native";
import {
  Plus,
  Avatar,
  Input,
  Container,
  Button,
  ImagePicker,
} from "src/components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthProfileForm } from "src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { authProfile } from "src/utils";
import { AuthContainer, ButtonContainer } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  AuthParamList,
  AuthRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import { ifProp } from "styled-tools";
import { useUpdateProfileMutation } from "src/generated/graphql";

type Props = CompositeScreenProps<
  StackScreenProps<AuthParamList, AuthRoute.AuthProfile>,
  StackScreenProps<RootParamList, RootRoute.Auth>
>;

export const AuthProfile = ({ navigation: { navigate } }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthProfileForm>({
    resolver: yupResolver(authProfile),
    mode: "onChange",
  });
  const [updateProfile] = useUpdateProfileMutation();
  const [img, setImg] = useState<ImageInfo | null>(null);

  const onSubmited = async (data: AuthProfileForm) => {
    await updateProfile({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: img?.base64,
        avatarExt: img?.uri.slice(img?.uri.lastIndexOf(".") + 1),
      },
    });
    navigate(AuthRoute.AuthPassword);
  };

  return (
    <AuthContainer>
      <ProfileContainer>
        <ImagePickerContainer>
          <ImagePicker
            image={img}
            setImage={setImg}
            placeholder={<Avatar width={56} height={56} />}
          />
        </ImagePickerContainer>
        <Container>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                placeholder="First Name (Required)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                placeholder="Last Name (Optional)"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Container>
      </ProfileContainer>
      <Container>
        <ButtonContainer>
          <Button disabled={!isValid} onPress={handleSubmit(onSubmited)}>
            Save
          </Button>
        </ButtonContainer>
      </Container>
    </AuthContainer>
  );
};

const StyledInput = styled(Input)`
  margin-bottom: 12px;
`;

const ProfileContainer = styled.View`
  margin-top: 46px;
`;

const ImagePickerContainer = styled.View`
  margin: auto;
  margin-bottom: 30px;
`;
