import {
  AuthRoute,
  ChatsRoute,
  ContactsRoute,
  MainRoute,
} from "src/navigation/types";

export const getTitle = (title: string) => {
  switch (title) {
    case AuthRoute.AuthProfile:
      return "Your Profile";
    case MainRoute.Contacts:
      return "Contacts";
    case MainRoute.Chats:
      return "Chats";
    case MainRoute.More:
      return "More";
    case ContactsRoute.AddContact:
      return "Add Contact";
    case ContactsRoute.MyContacts:
      return "Contacts";
    case ChatsRoute.MyChats:
      return "Chats";
    case ChatsRoute.AddChat:
      return "Add Chat";
    default:
      return "";
  }
};
