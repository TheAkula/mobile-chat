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
