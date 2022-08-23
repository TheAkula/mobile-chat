import { Image, TouchableOpacity, View } from "react-native";
import { User } from "src/generated/graphql";
import styled from "styled-components/native";
import { Avatar, Plus } from "src/components";
import { ContactBtn } from "./contact-btn";

interface Props {
  item: Partial<User>;
  add?: (id: string) => void;
  remove?: (id: string) => void;
  send?: (id: string) => void;
}

export const Contact = ({ item, add, remove }: Props) => {
  const addPressed = () => {
    add && item.id && add(item.id);
  };

  const removePressed = () => {
    remove && item.id && remove(item.id);
  };

  return (
    <TouchableOpacity>
      <ContactContainer>
        <Wrapper>
          <ImageContainer>
            {item.avatar ? <Image source={{ uri: item.avatar }} /> : <Avatar />}
          </ImageContainer>
          <View>
            <Name>{[item.firstName, item.lastName].join(" ")}</Name>
            <Status>
              {item.isActive ? "Online" : "Last seen " + item.lastSeen}
            </Status>
          </View>
        </Wrapper>
        <Wrapper>
          {add && !item.isFriend && (
            <ContactBtn pressed={addPressed}>
              <BtnText>Add</BtnText>
              <Plus width={12} height={12} />
            </ContactBtn>
          )}

          {remove && item.isFriend && (
            <ContactBtn pressed={removePressed}>
              <BtnText>Remove</BtnText>
            </ContactBtn>
          )}
        </Wrapper>
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

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContactContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const Status = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.small};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const BtnText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;
