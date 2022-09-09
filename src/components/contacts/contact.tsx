import { TouchableOpacity, View } from "react-native";
import { useMyInfoQuery, User } from "src/generated/graphql";
import styled from "styled-components/native";
import { Plus, Btn } from "src/components";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ContactsParamList,
  ContactsRoute,
  MainParamList,
  MainRoute,
  MoreRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface Props {
  item: Partial<User>;
  add?: (id: string) => void;
  remove?: (id: string) => void;
  send?: (id: string) => void;
  isAdd?: (item: Partial<User>) => boolean;
  isRemove?: (item: Partial<User>) => boolean;
}

type NavProp = CompositeNavigationProp<
  StackNavigationProp<ContactsParamList, ContactsRoute.MyContacts>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainParamList, MainRoute.Contacts>,
    StackNavigationProp<RootParamList, RootRoute.Main>
  >
>;

export const Contact = ({ item, add, remove, isAdd, isRemove }: Props) => {
  const { push } = useNavigation<NavProp>();
  // const user = useUser();
  const { data } = useMyInfoQuery();

  const addPressed = () => {
    add && item.id && add(item.id);
  };

  const removePressed = () => {
    remove && item.id && remove(item.id);
  };

  const userName = [item.firstName, item.lastName || ""].join(" ");
  const isMe = item.id === data?.myUserInfo?.id;

  const handlePress = () => {
    if (item.id) {
      if (isMe) {
        push(RootRoute.Main, {
          screen: MainRoute.More,
          params: {
            screen: MoreRoute.Account,
          },
        });
      } else {
        push(ContactsRoute.Profile, {
          userId: item.id,
          name: userName,
        });
      }
    }
  };

  const itemHasAdd = isAdd && isAdd(item);
  const itemHasRemove = isRemove && isRemove(item);

  return (
    <TouchableOpacity onPress={handlePress}>
      <ContactWrapper>
        <ContactContainer>
          <Wrapper>
            <ImageContainer>
              {item.avatar ? (
                <StyledImage source={{ uri: item.avatar }} />
              ) : (
                <Title>
                  {[item.firstName?.[0], item.lastName?.[0]]
                    .join("")
                    .toUpperCase()}
                </Title>
              )}
            </ImageContainer>
            <View>
              <Name>{userName}</Name>
              <Status>
                {item.lastSeen &&
                  (item.isActive ? "Online" : "Last seen " + item.lastSeen)}
              </Status>
            </View>
          </Wrapper>
          <Wrapper>
            {!isMe && add && itemHasAdd && (
              <Btn pressed={addPressed}>
                <Wrapper>
                  <BtnContainer>
                    <BtnText>Add</BtnText>
                  </BtnContainer>
                  <Plus width={16} height={16} />
                </Wrapper>
              </Btn>
            )}

            {!isMe && remove && itemHasRemove && (
              <Btn pressed={removePressed}>
                <BtnText>Remove</BtnText>
              </Btn>
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
  width: 48px;
  height: 48px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.blue[2]};
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

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  color: ${({ theme }) => theme.colors.white[0]};
  font-weight: bold;
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;
