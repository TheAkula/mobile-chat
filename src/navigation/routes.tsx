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
  useActivateMutation,
  useGoOutMutation,
  useMessageSendedSubscription,
  useMyInfoQuery,
  useUserInfoLazyQuery,
} from "src/generated/graphql";
import { useAppState } from "@react-native-community/hooks";

const RootStack = createStackNavigator<RootParamList>();

export const Routes = () => {
  const appState = useAppState();
  const [activateUser] = useActivateMutation();
  const [goOut] = useGoOutMutation();
  const { data: userData, loading } = useMyInfoQuery();

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
