import { update } from "lodash";
import {
  ContactsDocument,
  ContactsQuery,
  MyChatsDocument,
  MyChatsQuery,
  useAddContactMutation,
  useCreateChatMutation,
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
