import { Image } from "react-native";
import {
  ImageInfo,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import styled from "styled-components/native";
import { Plus, Avatar, Input, Container, Button } from "src/components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthProfileForm } from "src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { authProfile } from "src/utils";
import { AuthContainer, ButtonContainer } from "./styles";
import { useUpdateProfile } from "src/models";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  AuthParamList,
  AuthRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import { ifProp } from "styled-tools";

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
  const updateProfile = useUpdateProfile();
  const [img, setImg] = useState<ImageInfo | null>(null);
  const handlePress = async () => {
    const img = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (img.cancelled === false) {
      setImg(img);
    }
  };

  const onSubmited = async (data: AuthProfileForm) => {
    await updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: img?.base64,
      avatarExt: img?.uri.slice(img?.uri.lastIndexOf(".") + 1),
    });
    navigate(AuthRoute.AuthPassword);
  };

  return (
    <AuthContainer>
      <ProfileContainer>
        <ImagePickerContainer onPress={handlePress} hasImage={!!img?.uri}>
          {img?.uri ? (
            <Image source={{ uri: img.uri, width: 100, height: 100 }} />
          ) : (
            <>
              <Avatar width={56} height={56} />
              <ImagePickerPlus>
                <Plus />
              </ImagePickerPlus>
            </>
          )}
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

const ImagePickerContainer = styled.TouchableOpacity<{ hasImage: boolean }>`
  background-color: ${({ theme }) =>
    ifProp("hasImage", theme.colors.transparent, theme.colors.blue[6])};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  justify-content: center;
  overflow: ${ifProp("hasImage", "hidden", "visible")};
  align-items: center;
  margin: auto;
  margin-bottom: 30px;
`;

const ImagePickerPlus = styled.View`
  position: absolute;
  right: 3px;
  bottom: -1px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 12px;
`;

const ProfileContainer = styled.View`
  margin-top: 46px;
  /* flex: 1; */
  /* justify-content: space-between; */
`;
