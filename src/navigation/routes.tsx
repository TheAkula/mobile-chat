import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
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
  useMyChatsLazyQuery,
  useMyInfoLazyQuery,
  useMyInfoQuery,
  useUserInfoLazyQuery,
} from "src/generated/graphql";
import { useAppState } from "@react-native-community/hooks";
import { useMessageSended } from "src/hooks";
import { apolloClient } from "src/api";

const RootStack = createStackNavigator<RootParamList>();

export const Routes = () => {
  const appState = useAppState();
  const [activateUser] = useActivateMutation();
  const [goOut] = useGoOutMutation();
  const { data: userData, loading, error } = useMyInfoQuery();

  useEffect(() => {
    if (userData) {
      if (appState === "active") {
        activateUser();
      } else {
        goOut();
      }
    }
  }, [appState, userData]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const isUnauthorized = error?.message === "Unauthorized";

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
        {!isUnauthorized &&
          userData?.myUserInfo?.authStatus === AuthStatus.HaveAccount && (
            <>
              <RootStack.Screen name={RootRoute.Main} component={Main} />
              <RootStack.Screen name={RootRoute.Chat} component={Chat} />
            </>
          )}
        {(isUnauthorized ||
          userData?.myUserInfo?.authStatus !== AuthStatus.HaveAccount) && (
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
