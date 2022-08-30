import {
  ImageInfo,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { ReactNode } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { ifProp } from "styled-tools";
import { Plus } from "./icons";

interface Props {
  setImage: (image: ImageInfo) => void;
  image: ImageInfo | null;
  placeholder: ReactNode;
}

export const ImagePicker = ({ image, setImage, placeholder }: Props) => {
  const handlePress = async () => {
    const img = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (img.cancelled === false) {
      setImage(img);
    }
  };
  return (
    <ImagePickerContainer onPress={handlePress} hasImage={!!image?.uri}>
      {image?.uri ? (
        <Image source={{ uri: image.uri, width: 100, height: 100 }} />
      ) : (
        <>
          {placeholder}
          <ImagePickerPlus>
            <Plus />
          </ImagePickerPlus>
        </>
      )}
    </ImagePickerContainer>
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
`;

const ImagePickerPlus = styled.View`
  position: absolute;
  right: 3px;
  bottom: -1px;
`;
