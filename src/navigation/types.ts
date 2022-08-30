import { NavigatorScreenParams } from "@react-navigation/native";

export enum RootRoute {
  Auth = "Auth",
  Main = "Main",
  Chat = "Chat",
}

export enum AuthRoute {
  AuthPhone = "AuthPhone",
  AuthCode = "AuthCode",
  AuthProfile = "AuthProfile",
  AuthWelcome = "AuthWelcome",
  AuthSignIn = "AuthSignIn",
  AuthPassword = "AuthPassword",
}

export enum MainRoute {
  Chats = "Chats",
  Contacts = "Contacts",
  More = "More",
}

export enum ContactsRoute {
  MyContacts = "MyContacts",
  AddContact = "AddContact",
  Profile = "Profile",
}

export enum ChatsRoute {
  MyChats = "MyChats",
  AddChat = "AddChat",
}

export enum MoreRoute {
  Account = "Account",
}

export enum ChatRoute {
  Messages = "Messages",
  Invite = "Invite",
}

export type RootParamList = {
  [RootRoute.Auth]: NavigatorScreenParams<AuthParamList>;
  [RootRoute.Main]: NavigatorScreenParams<MainParamList>;
  [RootRoute.Chat]: NavigatorScreenParams<ChatParamsList>;
};

export type AuthParamList = {
  [AuthRoute.AuthPhone]: undefined;
  [AuthRoute.AuthCode]: { email: string; counter: number };
  [AuthRoute.AuthProfile]: undefined;
  [AuthRoute.AuthWelcome]: undefined;
  [AuthRoute.AuthSignIn]: undefined;
  [AuthRoute.AuthPassword]: undefined;
};

export type MainParamList = {
  [MainRoute.Chats]: NavigatorScreenParams<ChatsParamsList>;
  [MainRoute.Contacts]: NavigatorScreenParams<ContactsParamList>;
  [MainRoute.More]: NavigatorScreenParams<MoreParamsList>;
};

export type ContactsParamList = {
  [ContactsRoute.AddContact]: undefined;
  [ContactsRoute.MyContacts]: undefined;
  [ContactsRoute.Profile]: { userId: string; name: string };
};

export type ChatsParamsList = {
  [ChatsRoute.AddChat]: undefined;
  [ChatsRoute.MyChats]: undefined;
};

export type MoreParamsList = {
  [MoreRoute.Account]: undefined;
};

export type ChatParamsList = {
  [ChatRoute.Invite]: undefined;
  [ChatRoute.Messages]: { name: string; chatId: string };
};
