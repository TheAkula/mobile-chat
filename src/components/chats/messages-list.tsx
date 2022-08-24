import { FlatList, ListRenderItem } from "react-native";
import { Message as MessageType } from "src/generated/graphql";
import { useUser } from "src/models";
import { DeepPartial } from "src/types";
import styled from "styled-components/native";
import { Message } from "./message";

interface Props {
  messages: DeepPartial<MessageType>[];
}

export const MessagesList = ({ messages }: Props) => {
  const user = useUser();

  const renderItem: ListRenderItem<DeepPartial<MessageType>> = ({ item }) => {
    return <Message {...item} isMine={item.author?.id === user?.id} />;
  };

  const lastIndex = messages.findIndex((message) => !message.isRead);
  const index = lastIndex === -1 ? 0 : messages.length - 1 - lastIndex;

  return (
    <FlatList
      contentContainerStyle={{
        paddingRight: 16,
        paddingLeft: 16,
      }}
      initialScrollIndex={index}
      data={messages}
      renderItem={renderItem}
      inverted
    />
  );
};
