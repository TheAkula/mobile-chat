import { FlatList, ListRenderItem } from "react-native";
import { Chat as ChatType, User } from "src/generated/graphql";
import { DeepPartial } from "src/types";
import styled from "styled-components/native";
import { Chat } from "./chat";

interface Props {
  chats: DeepPartial<ChatType>[];
}

export const ChatsList = ({ chats }: Props) => {
  const renderItem: ListRenderItem<DeepPartial<ChatType>> = ({ item }) => {
    return <Chat item={item} />;
  };

  if (!chats.length) {
    return <NoFind>No contacts</NoFind>;
  }

  return <FlatList data={chats} renderItem={renderItem} />;
};

const NoFind = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};

  margin: auto;
  margin-top: 100px;
`;
