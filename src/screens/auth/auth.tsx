import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Header } from "src/components";
import { AsyncStorageKey } from "src/constants";
import {
  AuthStatus,
  useMyInfoLazyQuery,
  useMyInfoQuery,
} from "src/generated/graphql";
import { AuthParamList, AuthRoute } from "src/navigation/types";
import { AuthCode } from "./auth-code";
import { AuthEmail } from "./auth-email";
import { AuthPassword } from "./auth-password";
import { AuthProfile } from "./auth-profile";
import { AuthSignIn } from "./auth-signin";
import { Welcome } from "./auth-welcome";

const AuthStack = createStackNavigator<AuthParamList>();

const getRoute = (status: AuthStatus | undefined) => {
  switch (status) {
    case AuthStatus.Authenticated:
      return AuthRoute.AuthProfile;
    case AuthStatus.HaveProfile:
      return AuthRoute.AuthPassword;
    default:
      return AuthRoute.AuthWelcome;
  }
};

export const Auth = () => {
  const [fetchInfo, { data: userData, loading }] = useMyInfoLazyQuery();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN).then((token) => {
      if (token) {
        fetchInfo({
          onCompleted() {
            setIsFetched(true);
          },
        });
      } else {
        setIsFetched(true);
      }
    });
  }, [userData]);

  if (loading || !isFetched) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthStack.Navigator
      initialRouteName={getRoute(userData?.myUserInfo?.authStatus)}
      screenOptions={{
        header: (props) => <Header {...props} back={!!props.back} />,
      }}
    >
      <AuthStack.Screen name={AuthRoute.AuthEmail} component={AuthEmail} />
      <AuthStack.Screen name={AuthRoute.AuthCode} component={AuthCode} />
      <AuthStack.Screen name={AuthRoute.AuthProfile} component={AuthProfile} />
      <AuthStack.Screen name={AuthRoute.AuthWelcome} component={Welcome} />
      <AuthStack.Screen
        name={AuthRoute.AuthPassword}
        component={AuthPassword}
      />
      <AuthStack.Screen name={AuthRoute.AuthSignIn} component={AuthSignIn} />
    </AuthStack.Navigator>
  );
};
