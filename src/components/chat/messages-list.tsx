import { useCallback, useMemo, useRef, useState } from "react";
import {
  DefaultSectionT,
  LayoutChangeEvent,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  View,
  ViewToken,
} from "react-native";
import { useCurrentChatContext } from "src/context";
import {
  MessagesDocument,
  MessagesQuery,
  MessagesQueryVariables,
  MyChatsDocument,
  MyChatsQuery,
  useMyInfoQuery,
  useReadMessagesMutation,
} from "src/generated/graphql";
import { Message } from "./message";
import { MessagesListHeader } from "./messges-list-header";
import { ListSection, MessageToShow } from "./types";

interface Props {
  messages: ListSection[];
  endReached?: () => void;
  isFriendsChat?: boolean;
}

interface ViewableHandlerProps {
  changed: ViewToken[];
  viewableItems: ViewToken[];
}

interface SectionHeaderRenderProps {
  section: SectionListData<MessageToShow, DefaultSectionT>;
}

export const MessagesList = ({
  messages,
  endReached,
  isFriendsChat,
}: Props) => {
  const { data: userData } = useMyInfoQuery();
  const [readMessages, { loading: readLoading }] = useReadMessagesMutation();
  const { currentChat } = useCurrentChatContext();
  const renderItem: SectionListRenderItem<MessageToShow> = ({ item }) => {
    return (
      <View>
        <Message
          {...item}
          isFriendsChat={isFriendsChat}
          isMine={item.author?.id === userData?.myUserInfo?.id}
        />
      </View>
    );
  };

  const renderSectionHeader = ({ section }: SectionHeaderRenderProps) => {
    return <MessagesListHeader title={section.title} />;
  };

  const onViewableItemsChanged = useCallback(
    ({ changed }: ViewableHandlerProps) => {
      const notViewed = changed
        .filter(({ item }) => !item.isRead && item.id)
        .map(({ item }) => item.id);

      if (notViewed.length && !readLoading) {
        readMessages({
          variables: {
            messagesIds: Array.from(new Set(notViewed)),
          },
          update(client, { data }) {
            if (!userData) {
              return;
            }

            const messages = client.readQuery<
              MessagesQuery,
              MessagesQueryVariables
            >({
              query: MessagesDocument,
              variables: {
                id: currentChat,
              },
            });

            const updatedMessages = messages?.messages.data.map((message) => {
              if (
                new Date(message.createdAt) <=
                new Date(data?.readMessages.createdAt)
              ) {
                return {
                  ...message,
                  usersSeen: [...message.usersSeen, userData?.myUserInfo],
                };
              }

              return message;
            });

            client.writeQuery<MessagesQuery>({
              query: MessagesDocument,
              data: {
                ...messages,
                messages: {
                  ...messages?.messages,
                  data: updatedMessages || [],
                },
              },
            });
          },
        });
      }
    },
    []
  );

  return (
    <SectionList
      renderItem={renderItem}
      contentContainerStyle={{
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
      }}
      sections={messages}
      renderSectionFooter={renderSectionHeader}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        waitForInteraction: false,
        viewAreaCoveragePercentThreshold: 80,
      }}
      onEndReached={endReached}
      inverted
    />
  );
};
