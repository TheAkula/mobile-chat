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
}

export enum ChatsRoute {
  MyChats = "MyChats",
  AddChat = "AddChat",
}

export type RootParamList = {
  [RootRoute.Auth]: NavigatorScreenParams<AuthParamList>;
  [RootRoute.Main]: NavigatorScreenParams<MainParamList>;
  [RootRoute.Chat]: { name: string; chatId: string };
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
  [MainRoute.More]: undefined;
};

export type ContactsParamList = {
  [ContactsRoute.AddContact]: undefined;
  [ContactsRoute.MyContacts]: undefined;
};

export type ChatsParamsList = {
  [ChatsRoute.AddChat]: undefined;
  [ChatsRoute.MyChats]: undefined;
};
