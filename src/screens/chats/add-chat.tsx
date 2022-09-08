import { yupResolver } from "@hookform/resolvers/yup";
import { StackScreenProps } from "@react-navigation/stack";
import { ImageInfo } from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Chats, Container, ImagePicker, Input } from "src/components";
import { useCreateChatMutation } from "src/generated/graphql";
import { useCreateChat } from "src/hooks";
import { ChatsParamsList, ChatsRoute } from "src/navigation/types";
import { IAddChat } from "src/types";
import { chatsAdd } from "src/utils";
import styled from "styled-components/native";

type Props = StackScreenProps<ChatsParamsList, ChatsRoute.AddChat>;

export const AddChat = ({ navigation }: Props) => {
  const { navigate } = navigation;

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IAddChat>({
    resolver: yupResolver(chatsAdd),
    mode: "onChange",
  });

  const [image, setImage] = useState<ImageInfo | null>(null);
  const [createChat] = useCreateChat();

  const onSubmited = async (data: IAddChat) => {
    await createChat({
      variables: {
        name: data.name,
        image: image?.base64,
        imageExt: image?.uri.slice(image.uri.lastIndexOf(".") + 1),
      },
    });
    navigate(ChatsRoute.MyChats);
  };

  return (
    <Wrapper>
      <Container>
        <ImagePickerContainer>
          <ImagePicker
            image={image}
            setImage={setImage}
            placeholder={<Chats width={56} height={56} />}
          />
        </ImagePickerContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Chat title"
            />
          )}
        />
      </Container>
      <Container>
        <StyledButton disabled={!isValid} onPress={handleSubmit(onSubmited)}>
          Create
        </StyledButton>
      </Container>
    </Wrapper>
  );
};

const ImagePickerContainer = styled.View`
  margin: auto;
  margin-bottom: 30px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-bottom: 32px;
`;
