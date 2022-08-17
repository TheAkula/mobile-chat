import { Image, Text, View } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import styled from "styled-components/native";
import { Plus, Avatar, Input, Container, Button } from "src/components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthProfileForm } from "src/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { authProfile } from "src/utils";
import { AuthContainer, ButtonContainer } from "./styles";
import { useUpdateProfile, useUserStore } from "src/models";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import {
  AuthParamList,
  AuthRoute,
  MainRoute,
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
    mode: "all",
  });
  const updateProfile = useUpdateProfile();
  const [imgUri, setImgUri] = useState<string | null>(null);
  const { $user } = useUserStore();
  const handlePress = async () => {
    const img = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (img.cancelled === false) {
      setImgUri(img.uri);
    }
  };

  const onSubmited = async (data: AuthProfileForm) => {
    await updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.img,
    });
    console.log($user);
  };

  return (
    <AuthContainer>
      <ProfileContainer>
        <ImagePickerContainer onPress={handlePress} hasImage={!!imgUri}>
          {imgUri ? (
            <Image source={{ uri: imgUri, width: 100, height: 100 }} />
          ) : (
            <>
              <Avatar />
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
