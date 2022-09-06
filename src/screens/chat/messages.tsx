import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { MessagesList, ChatInput, ListSection } from "src/components/chat";
import { MessageToShow } from "src/components/chat";
import { Message } from "src/generated/graphql";
import {
  useFetchMessages,
  useFetchMessagesLoading,
  useFetchMoreMessages,
  useMessagesStore,
  useUser,
} from "src/models";
import { ChatParamsList, ChatRoute } from "src/navigation/types";
import { DeepPartial } from "src/types";
import { getMonth } from "src/utils";
import styled from "styled-components/native";

type Props = StackScreenProps<ChatParamsList, ChatRoute.Messages>;

const transformMessages = (
  messages: DeepPartial<Message>[],
  userId: string
) => {
  const data = messages.map((message) => {
    const usersIds = message.usersSeen?.map((u) => u?.id) || [];
    const isRead = usersIds.includes(userId);
    const isMyRead =
      !!usersIds.filter((id) => id !== userId).length &&
      message.author?.id === userId;

    return {
      ...message,
      isRead,
      isMyRead,
    };
  });
  const result: ListSection[] = [];
  const dateNow = new Date();
  const nowDay = dateNow.getDate();
  const nowMonth = dateNow.getMonth();
  let haveNotRead = false;
  let prevNotRead = true;

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].createdAt);
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();

    const title =
      nowDay === dateDay && nowMonth === dateMonth
        ? "Today"
        : [dateDay, getMonth(dateMonth)].join(" ");

    let sectionData = [];

    while (i < data.length) {
      const isRead = data[i].isRead || data[i].isMyRead;

      const messageDate = new Date(data[i].createdAt);

      const month = messageDate.getMonth();
      const day = messageDate.getDate();

      if (
        ((isRead && prevNotRead) || (!isRead && i === data.length - 1)) &&
        !haveNotRead &&
        sectionData.length
      ) {
        result.push({
          data: sectionData,
          title: "Not read messages",
          isNotRead: true,
          notReadIndex: i,
          index: result.length,
        });
        sectionData = [];
        haveNotRead = true;
      }

      prevNotRead = !isRead;

      if (month === dateMonth && day === dateDay) {
        sectionData?.push(data[i]);
        i++;
      } else {
        i--;
        break;
      }
    }

    if (sectionData.length) {
      result.push({
        title,
        data: sectionData,
        index: result.length,
      });
    }
  }

  return result;
};

export const Messages = ({ route }: Props) => {
  const { chatId } = route.params;
  const user = useUser();
  const { messages, messagesNextPage, messagesSkip } = useMessagesStore();
  const loading = useFetchMessagesLoading();
  const fetchMessages = useFetchMessages();
  const fetchMoreMessages = useFetchMoreMessages();

  useEffect(() => {
    console.log("qwe");
    fetchMessages({
      id: chatId,
      page: 0,
    });
  }, []);

  const onEndReached = () => {
    console.log("end");

    if (messagesNextPage) {
      console.log("fetch more");
      fetchMoreMessages({
        id: chatId,
        page: messagesNextPage,
        skip: messagesSkip,
      });
    }
  };

  const transformedMessages = transformMessages(messages, user?.id || "");

  const isAllRead = !!transformedMessages.find((message) => message.isNotRead);

  return (
    <Container>
      <View style={{ flex: 1 }}>
        {!loading && (
          <MessagesList
            messages={transformedMessages}
            endReached={onEndReached}
            isAllRead={isAllRead}
          />
        )}
      </View>
      <ChatInput chatId={chatId} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.blue[6]};
`;
