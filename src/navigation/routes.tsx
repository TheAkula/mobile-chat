import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Text, View } from "react-native";
import { Chevron, Header } from "src/components";
import { Auth, Chat } from "src/screens";
import { Main } from "./main";
import { AppTheme } from "src/theme";
import { RootParamList, RootRoute } from "./types";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "src/constants";
import styled from "styled-components/native";
import {
  AuthStatus,
  MessagesDocument,
  MessagesQuery,
  MessagesQueryVariables,
  MyChatsDocument,
  MyChatsQuery,
  useActivateMutation,
  useGoOutMutation,
  useMessageSendedSubscription,
  useMyInfoQuery,
  useUserInfoLazyQuery,
} from "src/generated/graphql";
import { useAppState } from "@react-native-community/hooks";

const RootStack = createStackNavigator<RootParamList>();

interface Props {
  userId: string;
}

export const Routes = ({ userId }: Props) => {
  const appState = useAppState();
  const [activateUser] = useActivateMutation();
  const [goOut] = useGoOutMutation();
  const { data: userData, loading } = useMyInfoQuery();

  useMessageSendedSubscription({
    variables: {
      userId: userId,
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

      if (userData) {
        const updatedMessages = messages?.messages.data.map((message) => {
          const seen = message.usersSeen.find(
            (user) =>
              user.id === subscriptionData.data?.messageCreated?.author.id
          );

          if (!seen && subscriptionData.data?.messageCreated?.author) {
            console.log(message.content, "seen");

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
      }

      const chats = client.readQuery<MyChatsQuery>({
        query: MyChatsDocument,
      });

      const exChatIndex = chats?.myChats.findIndex(
        (chat) => chat.id === subscriptionData.data?.messageCreated?.chat.id
      );

      if (exChatIndex !== undefined && exChatIndex !== -1) {
        const updatedChats = [...(chats?.myChats || [])];
        const isMine =
          subscriptionData.data.messageCreated.author.id ===
          userData?.myUserInfo.id;

        updatedChats[exChatIndex] = {
          ...updatedChats[exChatIndex],
          notSeen: updatedChats[exChatIndex].notSeen + (!isMine ? 1 : 0),
          messages: [
            subscriptionData.data?.messageCreated,
            ...updatedChats[exChatIndex].messages,
          ],
        };

        client.writeQuery<MyChatsQuery>({
          query: MyChatsDocument,
          data: {
            myChats: updatedChats,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (appState === "active") {
      activateUser();
    } else {
      goOut();
    }
  }, [appState]);

  if (loading || !userData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppTheme.colors.blue[7]}
      />
      <RootStack.Navigator
        initialRouteName={RootRoute.Auth}
        screenOptions={({ route }) => ({
          headerBackImage: () => <Chevron />,
          headerTitle: ({ children }) => <StyledTitle>{children}</StyledTitle>,
          headerStyle: {
            backgroundColor: AppTheme.colors.blue[7],
          },
          headerShown: false,
          headerShadowVisible: false,
        })}
      >
        {userData?.myUserInfo?.authStatus === AuthStatus.HaveAccount && (
          <>
            <RootStack.Screen name={RootRoute.Main} component={Main} />
            <RootStack.Screen name={RootRoute.Chat} component={Chat} />
          </>
        )}
        {userData?.myUserInfo?.authStatus !== AuthStatus.HaveAccount && (
          <RootStack.Screen
            name={RootRoute.Auth}
            component={Auth}
            options={{ title: "" }}
          />
        )}
      </RootStack.Navigator>
    </>
  );
};

const StyledTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.semiBig};
  line-height: ${({ theme }) => theme.lineHeights.semiBig};
  color: ${({ theme }) => theme.colors.white[0]};
`;
