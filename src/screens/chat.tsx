import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { MessagesList } from "src/components/chats";
import { ChatInput } from "src/components/chats/chat-input";
import {
  useFetchMessages,
  useFetchMessagesLoading,
  useFetchMoreMessages,
  useMessagesStore,
} from "src/models";
import { RootParamList, RootRoute } from "src/navigation/types";
import styled from "styled-components/native";

type Props = StackScreenProps<RootParamList, RootRoute.Chat>;

export const Chat = ({ route }: Props) => {
  const { chatId } = route.params;
  const { messages, messagesNextPage, messagesSkip } = useMessagesStore();
  const loading = useFetchMessagesLoading();
  const fetchMessages = useFetchMessages();
  const fetchMoreMessages = useFetchMoreMessages();

  useEffect(() => {
    if (!messages || !messages.length) {
      console.log(messagesNextPage, chatId);
      fetchMessages({
        id: chatId,
        page: messagesNextPage,
        skip: messagesSkip,
      });
    }
  }, []);

  const onEndReached = () => {
    if (messagesNextPage) {
      console.log(messagesNextPage, chatId);

      fetchMoreMessages({
        id: chatId,
        page: messagesNextPage,
        skip: messagesSkip,
      });
    }
  };

  if (!messages || loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container>
      <MessagesList messages={messages} endReached={onEndReached} />
      <ChatInput chatId={chatId} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.blue[6]};
`;
