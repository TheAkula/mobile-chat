import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  userToken: Scalars['String'];
};

export enum AuthStatus {
  Authenticated = 'Authenticated',
  HaveAccount = 'HaveAccount',
  HaveProfile = 'HaveProfile',
  NotAuthenticated = 'NotAuthenticated'
}

export type Chat = {
  __typename?: 'Chat';
  admin?: Maybe<User>;
  friend?: Maybe<User>;
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  isFriendsChat: Scalars['Boolean'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  notSeen: Scalars['Int'];
  users: Array<User>;
};


export type ChatMessagesArgs = {
  filter?: InputMaybe<ChatsFilter>;
};

export type ChatsFilter = {
  messagesAmount?: InputMaybe<Scalars['Int']>;
};

export type Message = {
  __typename?: 'Message';
  author: User;
  authorId: Scalars['String'];
  chat: Chat;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  usersSeen: Array<User>;
};

export enum MessageOrderBy {
  CreatedAt = 'createdAt',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type MessagesFilter = {
  orderBy?: InputMaybe<MessageOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activate: User;
  addFriend: User;
  addToChat: Chat;
  confirmSignUpWith2fa: UserWithAuth;
  createChat: Chat;
  createMessage: Message;
  createPersonalChat: Chat;
  goOut: User;
  login: Auth;
  readMessages: Message;
  removeFriend: User;
  removeFromChat: Chat;
  signUp: UserWithAuth;
  signUpWith2fa: TwoFactorAuth;
  upateMessage: Message;
  updateUser: User;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationAddToChatArgs = {
  chatId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationConfirmSignUpWith2faArgs = {
  code: Scalars['Int'];
  counter: Scalars['Int'];
};


export type MutationCreateChatArgs = {
  image?: InputMaybe<Scalars['String']>;
  imageExt?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreatePersonalChatArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReadMessagesArgs = {
  messagesIds: Array<Scalars['String']>;
};


export type MutationRemoveFriendArgs = {
  id: Scalars['String'];
};


export type MutationRemoveFromChatArgs = {
  chatId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpWith2faArgs = {
  email: Scalars['String'];
};


export type MutationUpateMessageArgs = {
  content?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  avatarExt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  data: Array<Message>;
  nextPage?: Maybe<Scalars['Int']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  nextPage?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  chat: Chat;
  messages: PaginatedMessages;
  myChats: Array<Chat>;
  myFriends: Array<User>;
  myUserInfo: User;
  user: User;
  users: PaginatedUsers;
};


export type QueryChatArgs = {
  chatId: Scalars['String'];
};


export type QueryMessagesArgs = {
  filter?: InputMaybe<MessagesFilter>;
  id: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilter>;
  page?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated: Chat;
  messageCreated?: Maybe<Message>;
  messageUpdated: Array<Message>;
  userActivityChanged: User;
};


export type SubscriptionChatCreatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionMessageCreatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionMessageUpdatedArgs = {
  userId: Scalars['String'];
};

export type TwoFactorAuth = {
  __typename?: 'TwoFactorAuth';
  counter: Scalars['Int'];
  userToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  authStatus: AuthStatus;
  avatar?: Maybe<Scalars['String']>;
  chats: Array<Chat>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  friends: Array<User>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isFriend: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['String'];
};

export type UserWithAuth = {
  __typename?: 'UserWithAuth';
  authStatus: AuthStatus;
  avatar?: Maybe<Scalars['String']>;
  chats: Array<Chat>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  friends: Array<User>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isFriend: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['String'];
  userToken: Scalars['String'];
};

export type UsersFilter = {
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<UsersOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum UsersOrderBy {
  FirstName = 'firstName',
  LastName = 'lastName'
}

export type ActivateMutationVariables = Exact<{ [key: string]: never; }>;


export type ActivateMutation = { __typename?: 'Mutation', activate: { __typename?: 'User', isActive: boolean, lastSeen: string } };

export type AddContactMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type AddContactMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'User', id: string, isFriend: boolean, firstName?: string | null, lastName?: string | null, isActive: boolean, lastSeen: string, avatar?: string | null, friends: Array<{ __typename?: 'User', id: string }> } };

export type AddToChatMutationVariables = Exact<{
  userId: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type AddToChatMutation = { __typename?: 'Mutation', addToChat: { __typename?: 'Chat', id: string, users: Array<{ __typename?: 'User', id: string }> } };

export type ChatQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type ChatQuery = { __typename?: 'Query', chat: { __typename?: 'Chat', id: string, isFriendsChat: boolean, users: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, email: string }>, admin?: { __typename?: 'User', id: string } | null } };

export type ConfirmSignUpWith2faMutationVariables = Exact<{
  code: Scalars['Int'];
  counter: Scalars['Int'];
}>;


export type ConfirmSignUpWith2faMutation = { __typename?: 'Mutation', confirmSignUpWith2fa: { __typename?: 'UserWithAuth', userToken: string } };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', myFriends: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, lastSeen: string, isActive: boolean }> };

export type CreateChatMutationVariables = Exact<{
  name: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  imageExt?: InputMaybe<Scalars['String']>;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name?: string | null, isFriendsChat: boolean, imgUrl?: string | null, friend?: { __typename?: 'User', id: string } | null } };

export type CreatePersonalChatMutationVariables = Exact<{
  id: Scalars['String'];
  filter?: InputMaybe<ChatsFilter>;
}>;


export type CreatePersonalChatMutation = { __typename?: 'Mutation', createPersonalChat: { __typename?: 'Chat', id: string, name?: string | null, imgUrl?: string | null, notSeen: number, isFriendsChat: boolean, messages: Array<{ __typename?: 'Message', content: string, createdAt: any, author: { __typename?: 'User', id: string, firstName?: string | null } }>, friend?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null } | null } };

export type GoOutMutationVariables = Exact<{ [key: string]: never; }>;


export type GoOutMutation = { __typename?: 'Mutation', goOut: { __typename?: 'User', id: string } };

export type MessageSendedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MessageSendedSubscription = { __typename?: 'Subscription', messageCreated?: { __typename?: 'Message', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null }, chat: { __typename?: 'Chat', id: string }, usersSeen: Array<{ __typename?: 'User', id: string }> } | null };

export type MessageUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MessageUpdatedSubscription = { __typename?: 'Subscription', messageUpdated: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, updatedAt: any, usersSeen: Array<{ __typename?: 'User', id: string }> }> };

export type MessagesQueryVariables = Exact<{
  id: Scalars['String'];
  filter?: InputMaybe<MessagesFilter>;
  page?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'PaginatedMessages', nextPage?: number | null, data: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string, avatar?: string | null, firstName?: string | null, lastName?: string | null }, usersSeen: Array<{ __typename?: 'User', id: string }> }> } };

export type MyChatsQueryVariables = Exact<{
  filter?: InputMaybe<ChatsFilter>;
}>;


export type MyChatsQuery = { __typename?: 'Query', myChats: Array<{ __typename?: 'Chat', id: string, name?: string | null, imgUrl?: string | null, notSeen: number, isFriendsChat: boolean, messages: Array<{ __typename?: 'Message', content: string, createdAt: any, author: { __typename?: 'User', id: string, firstName?: string | null } }>, friend?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null } | null }> };

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = { __typename?: 'Query', myUserInfo: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: string | null, authStatus: AuthStatus } };

export type ReadMessagesMutationVariables = Exact<{
  messagesIds: Array<Scalars['String']> | Scalars['String'];
  filter?: InputMaybe<ChatsFilter>;
}>;


export type ReadMessagesMutation = { __typename?: 'Mutation', readMessages: { __typename?: 'Message', id: string, createdAt: any, chat: { __typename?: 'Chat', id: string, notSeen: number, messages: Array<{ __typename?: 'Message', content: string, createdAt: any, author: { __typename?: 'User', id: string, firstName?: string | null } }> } } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', removeFriend: { __typename?: 'User', id: string, isFriend: boolean, friends: Array<{ __typename?: 'User', id: string }> } };

export type RemoveFromChatMutationVariables = Exact<{
  userId: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type RemoveFromChatMutation = { __typename?: 'Mutation', removeFromChat: { __typename?: 'Chat', id: string, users: Array<{ __typename?: 'User', id: string }> } };

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: string }, usersSeen: Array<{ __typename?: 'User', id: string }> } };

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', userToken: string } };

export type SignUpWith2faMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignUpWith2faMutation = { __typename?: 'Mutation', signUpWith2fa: { __typename?: 'TwoFactorAuth', userToken: string, counter: number } };

export type UpdateProfileMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  avatarExt?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, email: string, authStatus: AuthStatus } };

export type UserActivityChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserActivityChangedSubscription = { __typename?: 'Subscription', userActivityChanged: { __typename?: 'User', id: string, isActive: boolean, lastSeen: string } };

export type UserInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserInfoQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, isActive: boolean, lastSeen: string, isFriend: boolean, friends: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, isActive: boolean, avatar?: string | null, email: string }> } };

export type UsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<UsersFilter>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', nextPage?: number | null, data: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, isFriend: boolean }> } };


export const ActivateDocument = gql`
    mutation activate {
  activate {
    isActive
    lastSeen
  }
}
    `;
export type ActivateMutationFn = Apollo.MutationFunction<ActivateMutation, ActivateMutationVariables>;

/**
 * __useActivateMutation__
 *
 * To run a mutation, you first call `useActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMutation, { data, loading, error }] = useActivateMutation({
 *   variables: {
 *   },
 * });
 */
export function useActivateMutation(baseOptions?: Apollo.MutationHookOptions<ActivateMutation, ActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateMutation, ActivateMutationVariables>(ActivateDocument, options);
      }
export type ActivateMutationHookResult = ReturnType<typeof useActivateMutation>;
export type ActivateMutationResult = Apollo.MutationResult<ActivateMutation>;
export type ActivateMutationOptions = Apollo.BaseMutationOptions<ActivateMutation, ActivateMutationVariables>;
export const AddContactDocument = gql`
    mutation addContact($friendId: String!) {
  addFriend(friendId: $friendId) {
    id
    isFriend
    friends {
      id
    }
    firstName
    lastName
    isActive
    lastSeen
    avatar
  }
}
    `;
export type AddContactMutationFn = Apollo.MutationFunction<AddContactMutation, AddContactMutationVariables>;

/**
 * __useAddContactMutation__
 *
 * To run a mutation, you first call `useAddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContactMutation, { data, loading, error }] = useAddContactMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAddContactMutation(baseOptions?: Apollo.MutationHookOptions<AddContactMutation, AddContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContactMutation, AddContactMutationVariables>(AddContactDocument, options);
      }
export type AddContactMutationHookResult = ReturnType<typeof useAddContactMutation>;
export type AddContactMutationResult = Apollo.MutationResult<AddContactMutation>;
export type AddContactMutationOptions = Apollo.BaseMutationOptions<AddContactMutation, AddContactMutationVariables>;
export const AddToChatDocument = gql`
    mutation addToChat($userId: String!, $chatId: String!) {
  addToChat(userId: $userId, chatId: $chatId) {
    id
    users {
      id
    }
  }
}
    `;
export type AddToChatMutationFn = Apollo.MutationFunction<AddToChatMutation, AddToChatMutationVariables>;

/**
 * __useAddToChatMutation__
 *
 * To run a mutation, you first call `useAddToChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToChatMutation, { data, loading, error }] = useAddToChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useAddToChatMutation(baseOptions?: Apollo.MutationHookOptions<AddToChatMutation, AddToChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToChatMutation, AddToChatMutationVariables>(AddToChatDocument, options);
      }
export type AddToChatMutationHookResult = ReturnType<typeof useAddToChatMutation>;
export type AddToChatMutationResult = Apollo.MutationResult<AddToChatMutation>;
export type AddToChatMutationOptions = Apollo.BaseMutationOptions<AddToChatMutation, AddToChatMutationVariables>;
export const ChatDocument = gql`
    query chat($chatId: String!) {
  chat(chatId: $chatId) {
    id
    users {
      id
      firstName
      lastName
      avatar
      email
    }
    isFriendsChat
    admin {
      id
    }
  }
}
    `;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ConfirmSignUpWith2faDocument = gql`
    mutation confirmSignUpWith2fa($code: Int!, $counter: Int!) {
  confirmSignUpWith2fa(code: $code, counter: $counter) {
    userToken
  }
}
    `;
export type ConfirmSignUpWith2faMutationFn = Apollo.MutationFunction<ConfirmSignUpWith2faMutation, ConfirmSignUpWith2faMutationVariables>;

/**
 * __useConfirmSignUpWith2faMutation__
 *
 * To run a mutation, you first call `useConfirmSignUpWith2faMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmSignUpWith2faMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmSignUpWith2faMutation, { data, loading, error }] = useConfirmSignUpWith2faMutation({
 *   variables: {
 *      code: // value for 'code'
 *      counter: // value for 'counter'
 *   },
 * });
 */
export function useConfirmSignUpWith2faMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmSignUpWith2faMutation, ConfirmSignUpWith2faMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmSignUpWith2faMutation, ConfirmSignUpWith2faMutationVariables>(ConfirmSignUpWith2faDocument, options);
      }
export type ConfirmSignUpWith2faMutationHookResult = ReturnType<typeof useConfirmSignUpWith2faMutation>;
export type ConfirmSignUpWith2faMutationResult = Apollo.MutationResult<ConfirmSignUpWith2faMutation>;
export type ConfirmSignUpWith2faMutationOptions = Apollo.BaseMutationOptions<ConfirmSignUpWith2faMutation, ConfirmSignUpWith2faMutationVariables>;
export const ContactsDocument = gql`
    query contacts {
  myFriends {
    id
    firstName
    lastName
    avatar
    lastSeen
    isActive
  }
}
    `;

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactsQuery(baseOptions?: Apollo.QueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, options);
      }
export function useContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, options);
        }
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<typeof useContactsLazyQuery>;
export type ContactsQueryResult = Apollo.QueryResult<ContactsQuery, ContactsQueryVariables>;
export const CreateChatDocument = gql`
    mutation createChat($name: String!, $image: String, $imageExt: String) {
  createChat(name: $name, image: $image, imageExt: $imageExt) {
    id
    name
    isFriendsChat
    imgUrl
    friend {
      id
    }
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      imageExt: // value for 'imageExt'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const CreatePersonalChatDocument = gql`
    mutation createPersonalChat($id: String!, $filter: ChatsFilter) {
  createPersonalChat(id: $id) {
    id
    name
    imgUrl
    messages(filter: $filter) {
      content
      author {
        id
        firstName
      }
      createdAt
    }
    notSeen
    isFriendsChat
    friend {
      id
      firstName
      lastName
      avatar
    }
  }
}
    `;
export type CreatePersonalChatMutationFn = Apollo.MutationFunction<CreatePersonalChatMutation, CreatePersonalChatMutationVariables>;

/**
 * __useCreatePersonalChatMutation__
 *
 * To run a mutation, you first call `useCreatePersonalChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalChatMutation, { data, loading, error }] = useCreatePersonalChatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCreatePersonalChatMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalChatMutation, CreatePersonalChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalChatMutation, CreatePersonalChatMutationVariables>(CreatePersonalChatDocument, options);
      }
export type CreatePersonalChatMutationHookResult = ReturnType<typeof useCreatePersonalChatMutation>;
export type CreatePersonalChatMutationResult = Apollo.MutationResult<CreatePersonalChatMutation>;
export type CreatePersonalChatMutationOptions = Apollo.BaseMutationOptions<CreatePersonalChatMutation, CreatePersonalChatMutationVariables>;
export const GoOutDocument = gql`
    mutation goOut {
  goOut {
    id
  }
}
    `;
export type GoOutMutationFn = Apollo.MutationFunction<GoOutMutation, GoOutMutationVariables>;

/**
 * __useGoOutMutation__
 *
 * To run a mutation, you first call `useGoOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [goOutMutation, { data, loading, error }] = useGoOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useGoOutMutation(baseOptions?: Apollo.MutationHookOptions<GoOutMutation, GoOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoOutMutation, GoOutMutationVariables>(GoOutDocument, options);
      }
export type GoOutMutationHookResult = ReturnType<typeof useGoOutMutation>;
export type GoOutMutationResult = Apollo.MutationResult<GoOutMutation>;
export type GoOutMutationOptions = Apollo.BaseMutationOptions<GoOutMutation, GoOutMutationVariables>;
export const MessageSendedDocument = gql`
    subscription messageSended($userId: String!) {
  messageCreated(userId: $userId) {
    id
    author {
      id
      firstName
      lastName
      avatar
    }
    content
    chat {
      id
    }
    createdAt
    updatedAt
    usersSeen {
      id
    }
  }
}
    `;

/**
 * __useMessageSendedSubscription__
 *
 * To run a query within a React component, call `useMessageSendedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSendedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSendedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageSendedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSendedSubscription, MessageSendedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSendedSubscription, MessageSendedSubscriptionVariables>(MessageSendedDocument, options);
      }
export type MessageSendedSubscriptionHookResult = ReturnType<typeof useMessageSendedSubscription>;
export type MessageSendedSubscriptionResult = Apollo.SubscriptionResult<MessageSendedSubscription>;
export const MessageUpdatedDocument = gql`
    subscription messageUpdated($userId: String!) {
  messageUpdated(userId: $userId) {
    id
    content
    createdAt
    updatedAt
    usersSeen {
      id
    }
  }
}
    `;

/**
 * __useMessageUpdatedSubscription__
 *
 * To run a query within a React component, call `useMessageUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageUpdatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageUpdatedSubscription, MessageUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageUpdatedSubscription, MessageUpdatedSubscriptionVariables>(MessageUpdatedDocument, options);
      }
export type MessageUpdatedSubscriptionHookResult = ReturnType<typeof useMessageUpdatedSubscription>;
export type MessageUpdatedSubscriptionResult = Apollo.SubscriptionResult<MessageUpdatedSubscription>;
export const MessagesDocument = gql`
    query messages($id: String!, $filter: MessagesFilter, $page: Int, $skip: Int) {
  messages(id: $id, filter: $filter, page: $page, skip: $skip) {
    data {
      id
      content
      author {
        id
        avatar
        firstName
        lastName
      }
      createdAt
      updatedAt
      usersSeen {
        id
      }
    }
    nextPage
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MyChatsDocument = gql`
    query myChats($filter: ChatsFilter) {
  myChats {
    id
    name
    imgUrl
    messages(filter: $filter) {
      content
      author {
        id
        firstName
      }
      createdAt
    }
    notSeen
    isFriendsChat
    friend {
      id
      firstName
      lastName
      avatar
    }
  }
}
    `;

/**
 * __useMyChatsQuery__
 *
 * To run a query within a React component, call `useMyChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyChatsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMyChatsQuery(baseOptions?: Apollo.QueryHookOptions<MyChatsQuery, MyChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, options);
      }
export function useMyChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyChatsQuery, MyChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, options);
        }
export type MyChatsQueryHookResult = ReturnType<typeof useMyChatsQuery>;
export type MyChatsLazyQueryHookResult = ReturnType<typeof useMyChatsLazyQuery>;
export type MyChatsQueryResult = Apollo.QueryResult<MyChatsQuery, MyChatsQueryVariables>;
export const MyInfoDocument = gql`
    query myInfo {
  myUserInfo {
    id
    firstName
    lastName
    email
    avatar
    authStatus
  }
}
    `;

/**
 * __useMyInfoQuery__
 *
 * To run a query within a React component, call `useMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyInfoQuery(baseOptions?: Apollo.QueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, options);
      }
export function useMyInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyInfoQuery, MyInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyInfoQuery, MyInfoQueryVariables>(MyInfoDocument, options);
        }
export type MyInfoQueryHookResult = ReturnType<typeof useMyInfoQuery>;
export type MyInfoLazyQueryHookResult = ReturnType<typeof useMyInfoLazyQuery>;
export type MyInfoQueryResult = Apollo.QueryResult<MyInfoQuery, MyInfoQueryVariables>;
export const ReadMessagesDocument = gql`
    mutation readMessages($messagesIds: [String!]!, $filter: ChatsFilter) {
  readMessages(messagesIds: $messagesIds) {
    id
    createdAt
    chat {
      id
      notSeen
      messages(filter: $filter) {
        content
        author {
          id
          firstName
        }
        createdAt
      }
    }
  }
}
    `;
export type ReadMessagesMutationFn = Apollo.MutationFunction<ReadMessagesMutation, ReadMessagesMutationVariables>;

/**
 * __useReadMessagesMutation__
 *
 * To run a mutation, you first call `useReadMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessagesMutation, { data, loading, error }] = useReadMessagesMutation({
 *   variables: {
 *      messagesIds: // value for 'messagesIds'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReadMessagesMutation(baseOptions?: Apollo.MutationHookOptions<ReadMessagesMutation, ReadMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadMessagesMutation, ReadMessagesMutationVariables>(ReadMessagesDocument, options);
      }
export type ReadMessagesMutationHookResult = ReturnType<typeof useReadMessagesMutation>;
export type ReadMessagesMutationResult = Apollo.MutationResult<ReadMessagesMutation>;
export type ReadMessagesMutationOptions = Apollo.BaseMutationOptions<ReadMessagesMutation, ReadMessagesMutationVariables>;
export const RemoveContactDocument = gql`
    mutation removeContact($id: String!) {
  removeFriend(id: $id) {
    id
    isFriend
    friends {
      id
    }
  }
}
    `;
export type RemoveContactMutationFn = Apollo.MutationFunction<RemoveContactMutation, RemoveContactMutationVariables>;

/**
 * __useRemoveContactMutation__
 *
 * To run a mutation, you first call `useRemoveContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeContactMutation, { data, loading, error }] = useRemoveContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveContactMutation(baseOptions?: Apollo.MutationHookOptions<RemoveContactMutation, RemoveContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveContactMutation, RemoveContactMutationVariables>(RemoveContactDocument, options);
      }
export type RemoveContactMutationHookResult = ReturnType<typeof useRemoveContactMutation>;
export type RemoveContactMutationResult = Apollo.MutationResult<RemoveContactMutation>;
export type RemoveContactMutationOptions = Apollo.BaseMutationOptions<RemoveContactMutation, RemoveContactMutationVariables>;
export const RemoveFromChatDocument = gql`
    mutation removeFromChat($userId: String!, $chatId: String!) {
  removeFromChat(userId: $userId, chatId: $chatId) {
    id
    users {
      id
    }
  }
}
    `;
export type RemoveFromChatMutationFn = Apollo.MutationFunction<RemoveFromChatMutation, RemoveFromChatMutationVariables>;

/**
 * __useRemoveFromChatMutation__
 *
 * To run a mutation, you first call `useRemoveFromChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromChatMutation, { data, loading, error }] = useRemoveFromChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useRemoveFromChatMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromChatMutation, RemoveFromChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromChatMutation, RemoveFromChatMutationVariables>(RemoveFromChatDocument, options);
      }
export type RemoveFromChatMutationHookResult = ReturnType<typeof useRemoveFromChatMutation>;
export type RemoveFromChatMutationResult = Apollo.MutationResult<RemoveFromChatMutation>;
export type RemoveFromChatMutationOptions = Apollo.BaseMutationOptions<RemoveFromChatMutation, RemoveFromChatMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($content: String!, $chatId: String!) {
  createMessage(content: $content, chatId: $chatId) {
    id
    content
    createdAt
    updatedAt
    author {
      id
    }
    usersSeen {
      id
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SigninDocument = gql`
    mutation signin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userToken
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignUpWith2faDocument = gql`
    mutation signUpWith2fa($email: String!) {
  signUpWith2fa(email: $email) {
    userToken
    counter
  }
}
    `;
export type SignUpWith2faMutationFn = Apollo.MutationFunction<SignUpWith2faMutation, SignUpWith2faMutationVariables>;

/**
 * __useSignUpWith2faMutation__
 *
 * To run a mutation, you first call `useSignUpWith2faMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWith2faMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWith2faMutation, { data, loading, error }] = useSignUpWith2faMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpWith2faMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWith2faMutation, SignUpWith2faMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpWith2faMutation, SignUpWith2faMutationVariables>(SignUpWith2faDocument, options);
      }
export type SignUpWith2faMutationHookResult = ReturnType<typeof useSignUpWith2faMutation>;
export type SignUpWith2faMutationResult = Apollo.MutationResult<SignUpWith2faMutation>;
export type SignUpWith2faMutationOptions = Apollo.BaseMutationOptions<SignUpWith2faMutation, SignUpWith2faMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($firstName: String, $lastName: String, $avatar: String, $avatarExt: String, $password: String) {
  updateUser(
    firstName: $firstName
    lastName: $lastName
    avatar: $avatar
    avatarExt: $avatarExt
    password: $password
  ) {
    id
    firstName
    lastName
    avatar
    email
    authStatus
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      avatar: // value for 'avatar'
 *      avatarExt: // value for 'avatarExt'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UserActivityChangedDocument = gql`
    subscription userActivityChanged {
  userActivityChanged {
    id
    isActive
    lastSeen
  }
}
    `;

/**
 * __useUserActivityChangedSubscription__
 *
 * To run a query within a React component, call `useUserActivityChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserActivityChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActivityChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserActivityChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserActivityChangedSubscription, UserActivityChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserActivityChangedSubscription, UserActivityChangedSubscriptionVariables>(UserActivityChangedDocument, options);
      }
export type UserActivityChangedSubscriptionHookResult = ReturnType<typeof useUserActivityChangedSubscription>;
export type UserActivityChangedSubscriptionResult = Apollo.SubscriptionResult<UserActivityChangedSubscription>;
export const UserInfoDocument = gql`
    query userInfo($id: String!) {
  user(id: $id) {
    id
    firstName
    lastName
    friends {
      id
      firstName
      lastName
      isActive
      avatar
      email
    }
    avatar
    isActive
    lastSeen
    isFriend
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;
export const UsersDocument = gql`
    query users($page: Int, $filter: UsersFilter, $skip: Int) {
  users(page: $page, filter: $filter, skip: $skip) {
    data {
      id
      firstName
      lastName
      avatar
      isFriend
    }
    nextPage
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;