import { useEffect } from "react";
import { Container } from "src/components";
import { ContactsList } from "src/components/contacts";
import { User } from "src/generated/graphql";
import {
  useAddToChat,
  useChatStore,
  useCurrentChat,
  useFetchChat,
  useFetchMyContacts,
  useMyContactsStore,
  useRemoveFromChat,
  useUser,
} from "src/models";
import styled from "styled-components/native";

export const Invite = () => {
  const currentChat = useCurrentChat();
  const { chat } = useChatStore();
  const { myContacts } = useMyContactsStore();
  const user = useUser();
  const fetchChat = useFetchChat();
  const fetchMyFriends = useFetchMyContacts();
  const addToChat = useAddToChat();
  const removeFromChat = useRemoveFromChat();

  useEffect(() => {
    fetchChat({
      chatId: currentChat,
    });
    if (!myContacts) {
      fetchMyFriends();
    }
  }, []);

  const addedToChat = (id: string) => {
    addToChat({
      userId: id,
      chatId: currentChat,
    });
  };

  const removedFromChat = (id: string) => {
    removeFromChat({
      userId: id,
      chatId: currentChat,
    });
  };

  const isAdd = (item: Partial<User>) => {
    return (
      !chat.users?.find((u) => item.id === u.id) && chat.admin?.id === user?.id
    );
  };

  const isRemove = (item: Partial<User>) => {
    return (
      !!chat.users?.find((u) => item.id === u.id) && chat.admin?.id === user?.id
    );
  };

  const usersToInvite = myContacts?.filter((friend) => {
    return !chat.users?.find((u) => friend.id === u.id);
  });

  return (
    <Container>
      <Header>Chat members</Header>
      <ContactsList
        contacts={chat.users || []}
        isRemove={isRemove}
        remove={removedFromChat}
      />
      <Header>Invite</Header>
      <ContactsList
        contacts={usersToInvite || []}
        isRemove={isRemove}
        isAdd={isAdd}
        add={addedToChat}
        remove={removedFromChat}
      />
    </Container>
  );
};

const Header = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};
  margin: auto;
  margin-bottom: 30px;
`;
