import { FlatList, ListRenderItem } from "react-native";
import { User } from "src/generated/graphql";
import styled from "styled-components/native";
import { Contact } from "./contact";

interface Props {
  contacts: Partial<User>[];
  add?: (id: string) => void;
  remove?: (id: string) => void;
  send?: (id: string) => void;
  endReached?: () => void;
  isAdd?: (item: Partial<User>) => boolean;
  isRemove?: (item: Partial<User>) => boolean;
}

export const ContactsList = ({
  contacts,
  add,
  remove,
  send,
  endReached,
  isAdd,
  isRemove,
}: Props) => {
  const renderItem: ListRenderItem<Partial<User>> = ({ item }) => {
    return (
      <Contact
        item={item}
        add={add}
        remove={remove}
        send={send}
        isAdd={isAdd}
        isRemove={isRemove}
      />
    );
  };

  if (!contacts.length) {
    return <NoFind>No contacts</NoFind>;
  }

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      onEndReached={endReached}
    />
  );
};

const NoFind = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};

  margin: auto;
  margin-top: 100px;
`;
