import { useCallback, useState } from "react";
import {
  DefaultSectionT,
  FlatList,
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  ViewToken,
} from "react-native";
import { Message as MessageType } from "src/generated/graphql";
import { useReadMessages, useUser } from "src/models";
import { DeepPartial } from "src/types";
import { getMonth } from "src/utils";
import { Message } from "./message";
import { MessagesListHeader } from "./messges-list-header";
import { MessageToShow } from "../chats/types";

interface Props {
  messages: DeepPartial<MessageType>[];
  endReached?: () => void;
}

interface ViewableHandlerProps {
  changed: ViewToken[];
  viewableItems: ViewToken[];
}

interface ListSection {
  title: string;
  data: MessageToShow[];
}

interface SectionHeaderRenderProps {
  section: SectionListData<MessageToShow, DefaultSectionT>;
}

const transformMessages = (
  messages: DeepPartial<MessageType>[],
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

  const result = [];
  const dateNow = new Date();
  const nowDay = dateNow.getDate();
  const nowMonth = dateNow.getMonth();

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].createdAt);
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();

    const title =
      nowDay === dateDay && nowMonth === dateMonth
        ? "Today"
        : [dateDay, getMonth(dateMonth)].join(" ");

    const section: ListSection = {
      title,
      data: [],
    };

    while (i < data.length - 1) {
      const messageDate = new Date(data[i].createdAt);
      const month = messageDate.getMonth();
      const day = messageDate.getDate();

      if (month === dateMonth && day === dateDay) {
        section.data.push(data[i]);
        i++;
      } else {
        break;
      }
    }

    if (section.data.length) {
      result.push(section);
    }
  }

  return result;
};

export const MessagesList = ({ messages, endReached }: Props) => {
  const user = useUser();
  const readMessages = useReadMessages();

  const renderItem: SectionListRenderItem<MessageToShow> = ({ item }) => {
    return <Message {...item} isMine={item.author?.id === user?.id} />;
  };

  const renderSectionHeader = ({ section }: SectionHeaderRenderProps) => {
    return <MessagesListHeader title={section.title} />;
  };

  const onViewableItemsChanged = useCallback(
    ({ changed }: ViewableHandlerProps) => {
      const notViewed = changed
        .filter(({ item }) => !item.isRead)
        .map(({ item }) => item.id);

      if (notViewed.length) {
        readMessages({
          messagesIds: notViewed,
        });
      }
    },
    []
  );

  const data = transformMessages(messages, user?.id || "");

  return (
    <SectionList
      renderItem={renderItem}
      contentContainerStyle={{
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
      }}
      sections={data}
      renderSectionFooter={renderSectionHeader}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 50,
      }}
      onEndReached={endReached}
      inverted
    />
  );
};
