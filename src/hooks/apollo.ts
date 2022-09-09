import { update } from "lodash";
import {
  ContactsDocument,
  ContactsQuery,
  MessagesDocument,
  MessagesQuery,
  MessagesQueryVariables,
  MyChatsDocument,
  MyChatsQuery,
  useAddContactMutation,
  useCreateChatMutation,
  useMessageSendedSubscription,
  useRemoveContactMutation,
} from "src/generated/graphql";

export const useAddContact = () =>
  useAddContactMutation({
    update: (cache, { data }) => {
      const existsingContacts = cache.readQuery<ContactsQuery>({
        query: ContactsDocument,
      });

      if (data?.addFriend) {
        cache.writeQuery<ContactsQuery>({
          query: ContactsDocument,
          data: {
            myFriends: [
              ...(existsingContacts?.myFriends || []),
              data?.addFriend,
            ],
          },
        });
      }
    },
  });

export const useRemoveContact = () =>
  useRemoveContactMutation({
    update(client, { data }) {
      const contacts = client.readQuery<ContactsQuery>({
        query: ContactsDocument,
      });

      if (contacts) {
        client.writeQuery<ContactsQuery>({
          query: ContactsDocument,
          data: {
            ...contacts,
            myFriends: contacts.myFriends.filter(
              (friend) => friend.id !== data?.removeFriend.id
            ),
          },
        });
      }
    },
  });

export const useCreateChat = () =>
  useCreateChatMutation({
    update(client, { data }) {
      const chats = client.readQuery<MyChatsQuery>({
        query: MyChatsDocument,
      });

      if (data) {
        client.writeQuery<MyChatsQuery>({
          query: MyChatsDocument,
          data: {
            ...chats,
            myChats: [
              ...(chats?.myChats || []),
              {
                ...data?.createChat,
                notSeen: 0,
                messages: [],
              },
            ],
          },
        });
      }
    },
  });

export const useMessageSended = (userId: string) =>
  useMessageSendedSubscription({
    variables: {
      userId,
    },
    onSubscriptionData({ client, subscriptionData }) {
      if (!subscriptionData.data?.messageCreated) {
        return;
      }

      const messages = client.readQuery<MessagesQuery, MessagesQueryVariables>({
        query: MessagesDocument,
        variables: {
          id: subscriptionData.data.messageCreated.chat.id,
        },
      });

      const updatedMessages = messages?.messages.data.map((message) => {
        const seen = message.usersSeen.find(
          (user) => user.id === subscriptionData.data?.messageCreated?.author.id
        );

        if (!seen && subscriptionData.data?.messageCreated?.author) {
          return {
            ...message,
            usersSeen: [
              ...message.usersSeen,
              subscriptionData.data.messageCreated.author,
            ],
          };
        }

        return message;
      });

      client.writeQuery<MessagesQuery>({
        query: MessagesDocument,
        variables: {
          id: subscriptionData.data.messageCreated.chat.id,
        },
        data: {
          ...messages,
          messages: {
            ...messages?.messages,
            data: [
              ...(updatedMessages || []),
              subscriptionData.data.messageCreated,
            ],
            nextPage: messages?.messages.nextPage || 0,
          },
        },
      });

      const chats = client.readQuery<MyChatsQuery>({
        query: MyChatsDocument,
      });

      const exChatIndex = chats?.myChats.findIndex(
        (chat) => chat.id === subscriptionData.data?.messageCreated?.chat.id
      );

      const updatedChats = [...(chats?.myChats || [])];
      const isMine = subscriptionData.data.messageCreated.author.id === userId;
      if (exChatIndex !== undefined && exChatIndex !== -1) {
        updatedChats[exChatIndex] = {
          ...updatedChats[exChatIndex],
          notSeen: updatedChats[exChatIndex].notSeen + (!isMine ? 1 : 0),
          messages: [
            subscriptionData.data?.messageCreated,
            ...updatedChats[exChatIndex].messages,
          ],
        };
      } else {
        updatedChats.push(subscriptionData.data.messageCreated.chat);
      }
      client.writeQuery<MyChatsQuery>({
        query: MyChatsDocument,
        data: {
          myChats: updatedChats,
        },
      });
    },
  });

export const useCreatePersonalChat = () =>
  useCreateChatMutation({
    update(client, { data }) {
      const chats = client.readQuery<MyChatsQuery>({
        query: MyChatsDocument,
      });

      const exChat = chats?.myChats.find(
        (chat) => chat.id === data?.createChat.id
      );

      if (!exChat && data) {
        client.writeQuery<MyChatsQuery>({
          query: MyChatsDocument,
          data: {
            ...chats,
            myChats: [
              ...(chats?.myChats || []),
              { ...data.createChat, notSeen: 0, messages: [] },
            ],
          },
        });
      }
    },
  });
