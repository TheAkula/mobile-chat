import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { MessagesList, ChatInput } from "src/components/chat";
import {
  useFetchMessages,
  useFetchMessagesLoading,
  useFetchMoreMessages,
  useMessagesStore,
} from "src/models";
import { ChatParamsList, ChatRoute } from "src/navigation/types";
import styled from "styled-components/native";

type Props = StackScreenProps<ChatParamsList, ChatRoute.Messages>;

export const Messages = ({ route }: Props) => {
  const { chatId } = route.params;
  const { messages, messagesNextPage, messagesSkip } = useMessagesStore();
  const loading = useFetchMessagesLoading();
  const fetchMessages = useFetchMessages();
  const fetchMoreMessages = useFetchMoreMessages();

  useEffect(() => {
    // if (messages) {
    fetchMessages({
      id: chatId,
      page: 0,
      skip: messagesSkip,
    });
    // }
  }, []);

  const onEndReached = () => {
    if (messagesNextPage) {
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
