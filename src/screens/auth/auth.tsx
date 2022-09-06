import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "src/components";
import { AuthStatus, useMyInfoQuery } from "src/generated/graphql";
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
  const { data: userData } = useMyInfoQuery();

  return (
    <AuthStack.Navigator
      initialRouteName={getRoute(userData?.myUserInfo?.authStatus)}
      screenOptions={{
        header: (props) => <Header {...props} back={!!props.back} />,
      }}
    >
      <AuthStack.Screen name={AuthRoute.AuthPhone} component={AuthEmail} />
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
