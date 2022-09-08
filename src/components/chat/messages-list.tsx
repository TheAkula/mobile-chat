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
  isAllRead?: boolean;
}

interface ViewableHandlerProps {
  changed: ViewToken[];
  viewableItems: ViewToken[];
}

interface SectionHeaderRenderProps {
  section: SectionListData<MessageToShow, DefaultSectionT>;
}

export const MessagesList = ({ messages, endReached, isAllRead }: Props) => {
  const { data: userData } = useMyInfoQuery();
  const [readMessages, { loading: readLoading }] = useReadMessagesMutation();
  const [itemsHeights, setItemsHeights] = useState<number[]>([]);
  const initialMessages = useRef(messages);
  const listRef = useRef<SectionList>(null);
  const { currentChat } = useCurrentChatContext();

  const itemOnLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    setItemsHeights((prevHeights) => [...prevHeights, height]);
  };

  const renderItem: SectionListRenderItem<MessageToShow> = ({ item }) => {
    return (
      <View>
        <Message
          {...item}
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
        console.log(notViewed);

        readMessages({
          variables: {
            messagesIds: Array.from(new Set(notViewed)),
          },
          update(client, { data }) {
            if (!userData) {
              return;
            }

            // if (data && messages && userData) {
            //   for (const readedMessage of data.readMessages) {
            //     const messagesIndex = messages.messages.data.findIndex(
            //       (message) => message.id === readedMessage.id
            //     );
            //     if (messagesIndex !== -1) {
            //       messages.messages.data[messagesIndex] = {
            //         ...messages.messages.data[messagesIndex],
            //         usersSeen: [
            //           ...messages.messages.data[messagesIndex].usersSeen,
            //           userData.myUserInfo,
            //         ],
            //       };
            //     }
            //   }
            //   client.writeQuery<MessagesQuery>({
            //     query: MessagesDocument,
            //     variables: {
            //       id: currentChat,
            //     },
            //     data: messages,
            //   });
            // }
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

  const section = initialMessages.current.find((section) => section.isNotRead);

  const data = useMemo(() => {
    const messagesSection = messages.find((section) => section.isNotRead);
    if (section && !isAllRead && !messagesSection) {
      return messages
        .slice(0, section.index)
        .concat(section)
        .concat(messages.slice(section.index));
    }
    return messages;
  }, [isAllRead, messages]);

  const onLayout = () => {
    console.log("onLayout");

    if (section) {
      console.log("scroll");

      console.log(section.notReadIndex);

      listRef.current?.scrollToLocation({
        sectionIndex: section?.index,
        itemIndex: section?.notReadIndex || 0,
        animated: false,
      });
    }
  };

  // const getItemLayout = useCallback(
  //   (
  //     data: SectionListData<MessageToShow, DefaultSectionT>[] | null,
  //     index: number
  //   ) => {
  //     const height = 60;

  //     return {
  //       length: height,
  //       offset: height * index,
  //       index,
  //     };
  //   },
  //   [itemsHeights]
  // );

  console.log(section?.notReadIndex);

  return (
    <SectionList
      // onLayout={onLayout}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
      }}
      sections={data}
      // getItemLayout={getItemLayout}
      renderSectionFooter={renderSectionHeader}
      onViewableItemsChanged={onViewableItemsChanged}
      // onContentSizeChange={onLayout}
      initialScrollIndex={section?.notReadIndex}
      viewabilityConfig={{
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 80,
      }}
      onEndReached={endReached}
      inverted
    />
  );
};
