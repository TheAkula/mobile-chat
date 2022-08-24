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
  friend?: Maybe<UserLink>;
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  isFriendsChat: Scalars['Boolean'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  notSeen: Scalars['Int'];
  users: Array<UserLink>;
};


export type ChatMessagesArgs = {
  filter?: InputMaybe<ChatsFilter>;
};

export type ChatLink = {
  __typename?: 'ChatLink';
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  isFriendsChat: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
};

export type ChatsFilter = {
  messagesAmount?: InputMaybe<Scalars['Int']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  chat?: Maybe<Chat>;
  id: Scalars['String'];
  receiver: UserLink;
  sender: UserLink;
  status: Scalars['String'];
  type: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  author: UserLink;
  chat: ChatLink;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isMyRead: Scalars['Boolean'];
  isRead: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  usersSeen: Array<UserLink>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: User;
  confirmSignUpWith2fa: UserWithAuth;
  createChat: Chat;
  createMessage: Message;
  createPersonalChat: Chat;
  inviteToChat: Invitation;
  inviteToFriends: Invitation;
  login: Auth;
  removeFriend: Scalars['String'];
  signUp: UserWithAuth;
  signUpWith2fa: TwoFactorAuth;
  updateUser: User;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationConfirmSignUpWith2faArgs = {
  code: Scalars['Int'];
  counter: Scalars['Int'];
};


export type MutationCreateChatArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreatePersonalChatArgs = {
  id: Scalars['String'];
};


export type MutationInviteToChatArgs = {
  receiverId: Scalars['String'];
};


export type MutationInviteToFriendsArgs = {
  receiverId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveFriendArgs = {
  id: Scalars['String'];
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


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  avatarExt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  description?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  invitaiton?: Maybe<Invitation>;
  isRead: Scalars['Boolean'];
  owner: User;
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  myChats: Array<Chat>;
  myFriends: Array<User>;
  myNotifications: Array<Notification>;
  myUserInfo: User;
  user: User;
  users: Array<User>;
};


export type QueryMessagesArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated: Chat;
  messageCreated?: Maybe<Message>;
};


export type SubscriptionChatCreatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionMessageCreatedArgs = {
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
  chats: Array<ChatLink>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  friends: Array<UserLink>;
  id: Scalars['String'];
  invitations: Array<Invitation>;
  isActive: Scalars['Boolean'];
  isFriend?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['String'];
  myInvitations: Array<Invitation>;
  notifications: Array<Notification>;
};

export type UserLink = {
  __typename?: 'UserLink';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
};

export type UserWithAuth = {
  __typename?: 'UserWithAuth';
  authStatus: AuthStatus;
  avatar?: Maybe<Scalars['String']>;
  chats: Array<ChatLink>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  friends: Array<UserLink>;
  id: Scalars['String'];
  invitations: Array<Invitation>;
  isActive: Scalars['Boolean'];
  isFriend?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['String'];
  myInvitations: Array<Invitation>;
  notifications: Array<Notification>;
  userToken: Scalars['String'];
};

export type AddContactMutationVariables = Exact<{
  friendId: Scalars['String'];
}>;


export type AddContactMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, isActive: boolean, lastSeen: string, avatar?: string | null } };

export type ConfirmSignUpWith2faMutationVariables = Exact<{
  code: Scalars['Int'];
  counter: Scalars['Int'];
}>;


export type ConfirmSignUpWith2faMutation = { __typename?: 'Mutation', confirmSignUpWith2fa: { __typename?: 'UserWithAuth', userToken: string } };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', myFriends: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, lastSeen: string }> };

export type MessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, updatedAt: any, isRead: boolean, isMyRead: boolean, author: { __typename?: 'UserLink', id: string, avatar?: string | null, firstName?: string | null, lastName?: string | null } }> };

export type MyChatsQueryVariables = Exact<{
  filter?: InputMaybe<ChatsFilter>;
}>;


export type MyChatsQuery = { __typename?: 'Query', myChats: Array<{ __typename?: 'Chat', id: string, name?: string | null, imgUrl?: string | null, notSeen: number, isFriendsChat: boolean, messages: Array<{ __typename?: 'Message', content: string, createdAt: any, author: { __typename?: 'UserLink', id: string, firstName?: string | null } }>, friend?: { __typename?: 'UserLink', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null } | null }> };

export type MyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInfoQuery = { __typename?: 'Query', myUserInfo: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: string | null, authStatus: AuthStatus } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', removeFriend: string };

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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, avatar?: string | null, isFriend?: boolean | null }> };


export const AddContactDocument = gql`
    mutation addContact($friendId: String!) {
  addFriend(friendId: $friendId) {
    id
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
export const MessagesDocument = gql`
    query messages($id: String!) {
  messages(id: $id) {
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
    isRead
    isMyRead
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
export const RemoveContactDocument = gql`
    mutation removeContact($id: String!) {
  removeFriend(id: $id)
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
export const UsersDocument = gql`
    query users {
  users {
    id
    firstName
    lastName
    avatar
    isFriend
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