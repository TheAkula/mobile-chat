import { TouchableOpacity, View } from "react-native";
import { Chat as ChatType, useMyInfoQuery } from "src/generated/graphql";
import styled from "styled-components/native";
import { DeepPartial } from "src/types";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ChatRoute,
  ChatsParamsList,
  ChatsRoute,
  MainParamList,
  MainRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useCurrentChatContext } from "src/context";

interface Props {
  item: DeepPartial<ChatType>;
}

type NavProp = CompositeNavigationProp<
  StackNavigationProp<ChatsParamsList, ChatsRoute.MyChats>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainParamList, MainRoute.Chats>,
    StackNavigationProp<RootParamList, RootRoute.Main>
  >
>;

export const Chat = ({ item }: Props) => {
  const { data: userData } = useMyInfoQuery();
  const { push } = useNavigation<NavProp>();
  const { setCurrentChat } = useCurrentChatContext();

  const handlePress = () => {
    setCurrentChat(item.id || "");

    push(RootRoute.Chat, {
      screen: ChatRoute.Messages,
      params: {
        name: item.isFriendsChat
          ? [item.friend?.firstName, item.friend?.lastName].join(" ")
          : item.name || "",
        chatId: item.id || "",
      },
    });
  };

  const sender =
    userData?.myUserInfo?.id === item.messages?.[0]?.author?.id
      ? "You"
      : !item.isFriendsChat
      ? item.messages?.[0]?.author?.firstName
      : "";

  return (
    <TouchableOpacity onPress={handlePress}>
      <ContactWrapper>
        <ContactContainer>
          <Wrapper>
            <ImageContainer>
              {item.imgUrl ? (
                <StyledImage source={{ uri: item.imgUrl }} />
              ) : (
                <Title>
                  {item.isFriendsChat
                    ? [item.friend?.firstName?.[0], item.friend?.lastName?.[0]]
                        .join("")
                        .toUpperCase()
                    : item.name?.[0].toUpperCase()}
                </Title>
              )}
            </ImageContainer>
            <View>
              <Name>
                {item.isFriendsChat
                  ? [item.friend?.firstName, item.friend?.lastName || ""].join(
                      " "
                    )
                  : item.name}
              </Name>
              {!!item.messages?.length && (
                <Status>
                  {sender && sender + " : "}
                  {item.messages?.[0]?.content}
                </Status>
              )}
            </View>
          </Wrapper>
          <Wrapper>
            {!!item.notSeen && (
              <MessagesCount>
                <Count>{item.notSeen}</Count>
              </MessagesCount>
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
  background-color: ${({ theme }) => theme.colors.blue[2]};
  justify-content: center;
  align-items: center;
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

const MessagesCount = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[4]};
  border-radius: 40px;
  padding: 2px 8px;
`;

const Count = styled.Text`
  color: ${({ theme }) => theme.colors.blue[0]};
  font-size: ${({ theme }) => theme.fontSizes.superSmall};
  line-height: ${({ theme }) => theme.lineHeights.superSmall};
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
