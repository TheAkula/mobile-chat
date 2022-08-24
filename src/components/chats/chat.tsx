import { TouchableOpacity, View } from "react-native";
import { Chat as ChatType } from "src/generated/graphql";
import styled from "styled-components/native";
import { Avatar } from "src/components";
import { DeepPartial } from "src/types";
import { useUser } from "src/models";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ChatsParamsList,
  ChatsRoute,
  MainParamList,
  MainRoute,
  RootParamList,
  RootRoute,
} from "src/navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

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
  const user = useUser();
  const { push } = useNavigation<NavProp>();

  const handlePress = () => {
    push(RootRoute.Chat, {
      name: item.isFriendsChat
        ? [item.friend?.firstName, item.friend?.lastName].join(" ")
        : item.name || "",
      chatId: item.id || "",
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ContactWrapper>
        <ContactContainer>
          <Wrapper>
            <ImageContainer>
              {item.imgUrl ? (
                <StyledImage source={{ uri: item.imgUrl }} />
              ) : (
                <Avatar />
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
              <Status>
                {user?.id === item.messages?.[0]?.author?.id
                  ? "You"
                  : !item.isFriendsChat
                  ? item.messages?.[0]?.author?.firstName
                  : ""}
                : {item.messages?.[0]?.content}
              </Status>
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
