import { NavigatorScreenParams } from "@react-navigation/native";

export enum RootRoute {
  Auth = "Auth",
  Main = "Main",
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
  Chat = "Chat",
}

export type RootParamList = {
  [RootRoute.Auth]: NavigatorScreenParams<AuthParamList>;
  [RootRoute.Main]: undefined;
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
  [MainRoute.Chats]: undefined;
  [MainRoute.Contacts]: undefined;
  [MainRoute.More]: undefined;
};

export type ContactsParamList = {
  [ContactsRoute.AddContact]: undefined;
  [ContactsRoute.MyContacts]: undefined;
};

export type ChatsParamsList = {
  [ChatsRoute.AddChat]: undefined;
  [ChatsRoute.MyChats]: undefined;
  [ChatsRoute.Chat]: { name: string; userId: string };
};
