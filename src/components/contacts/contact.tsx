import { Image, TouchableOpacity, View } from "react-native";
import { User } from "src/generated/graphql";
import styled from "styled-components/native";
import { Avatar } from "src/components";

interface Props {
  item: Partial<User>;
}

export const Contact = ({ item }: Props) => {
  return (
    <TouchableOpacity>
      <ContactContainer>
        <ImageContainer>
          {item.avatar ? <Image source={{ uri: item.avatar }} /> : <Avatar />}
        </ImageContainer>
        <View>
          <Name>{[item.firstName, item.lastName].join(" ")}</Name>
          <Status>
            {item.isActive ? "Online" : "Last seen " + item.lastSeen}
          </Status>
        </View>
      </ContactContainer>
    </TouchableOpacity>
  );
};

const ImageContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  margin-right: 12px;
`;

const ContactContainer = styled.View`
  flex-direction: row;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const Status = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.small};
  color: ${({ theme }) => theme.colors.white};
`;
