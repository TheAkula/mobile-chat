import { TouchableOpacity, View } from "react-native";
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
      <ContactWrapper>
        <ContactContainer>
          <Wrapper>
            <ImageContainer>
              {item.avatar ? (
                <StyledImage source={{ uri: item.avatar }} />
              ) : (
                <Avatar />
              )}
            </ImageContainer>
            <View>
              <Name>{[item.firstName, item.lastName].join(" ")}</Name>
              <Status>
                {item.lastSeen &&
                  (item.isActive ? "Online" : "Last seen " + item.lastSeen)}
              </Status>
            </View>
          </Wrapper>
          <Wrapper>
            {add && !item.isFriend && (
              <ContactBtn pressed={addPressed}>
                <Wrapper>
                  <BtnContainer>
                    <BtnText>Add</BtnText>
                  </BtnContainer>
                  <Plus width={16} height={16} />
                </Wrapper>
              </ContactBtn>
            )}

            {remove && item.isFriend && (
              <ContactBtn pressed={removePressed}>
                <BtnText>Remove</BtnText>
              </ContactBtn>
            )}
          </Wrapper>
        </ContactContainer>
      </ContactWrapper>
    </TouchableOpacity>
  );
};

const StyledImage = styled.Image`
  width: 48px;
  height: 48px;
`;

const ImageContainer = styled.View`
  border-radius: 16px;
  margin-right: 12px;
  overflow: hidden;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContactContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const Status = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.small};
  color: ${({ theme }) => theme.colors.white[2]};
`;

const BtnText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  color: ${({ theme }) => theme.colors.white[0]};
`;

const BtnContainer = styled.View`
  margin-right: 4px;
`;

const ContactWrapper = styled.View`
  padding-bottom: 12.5px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.blue[6]};
  border-style: solid;
  margin-top: 16px;
`;
