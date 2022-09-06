import { Container } from "src/components";
import { ContactsList } from "src/components/contacts";
import { useCurrentChatContext } from "src/context";
import {
  useAddToChatMutation,
  useChatQuery,
  useContactsQuery,
  useMyInfoQuery,
  User,
  useRemoveFromChatMutation,
} from "src/generated/graphql";

import styled from "styled-components/native";

export const Invite = () => {
  const { data: myContactsData } = useContactsQuery();
  const { data: userData } = useMyInfoQuery();
  const { currentChat } = useCurrentChatContext();
  const { data: chatData } = useChatQuery({
    variables: { chatId: currentChat },
  });
  const [addToChat] = useAddToChatMutation();
  const [removeFromChat] = useRemoveFromChatMutation();

  const addedToChat = (id: string) => {
    addToChat({
      variables: {
        userId: id,
        chatId: currentChat,
      },
    });
  };

  const removedFromChat = (id: string) => {
    removeFromChat({
      variables: {
        userId: id,
        chatId: currentChat,
      },
    });
  };

  const isAdd = (item: Partial<User>) => {
    return (
      !chatData?.chat.users?.find((u) => item.id === u.id) &&
      chatData?.chat.admin?.id === userData?.myUserInfo?.id
    );
  };

  const isRemove = (item: Partial<User>) => {
    return (
      !!chatData?.chat.users?.find((u) => item.id === u.id) &&
      chatData.chat.admin?.id === userData?.myUserInfo?.id
    );
  };

  const usersToInvite = myContactsData?.myFriends?.filter((friend) => {
    return !chatData?.chat.users?.find((u) => friend.id === u.id);
  });

  return (
    <Container>
      <Header>Chat members</Header>
      <ContactsList
        contacts={chatData?.chat.users || []}
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
