import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { MessagesList } from "src/components/chats";
import { ChatInput } from "src/components/chats/chat-input";
import { useFetchMessages, useMessagesStore } from "src/models";
import { RootParamList, RootRoute } from "src/navigation/types";
import styled from "styled-components/native";

type Props = StackScreenProps<RootParamList, RootRoute.Chat>;

export const Chat = ({ route }: Props) => {
  const { chatId } = route.params;

  const { messages, messagesLoading } = useMessagesStore();
  const fetchMessages = useFetchMessages();

  useEffect(() => {
    if (!messages || !messages.length) {
      fetchMessages({
        id: chatId,
      });
    }
  }, []);

  if (!messages || messagesLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Container>
      <MessagesList messages={[...messages].reverse()} />
      <ChatInput />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.blue[6]};
`;
