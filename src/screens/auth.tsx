import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Header } from "src/components";
import {
  AuthCode,
  AuthEmail,
  AuthPassword,
  AuthProfile,
  Welcome,
} from "src/components/auth";
import { AuthStatus } from "src/generated/graphql";
import { useUserStore } from "src/models";
import { AuthParamList, AuthRoute } from "src/navigation/types";

const AuthStack = createStackNavigator<AuthParamList>();

const getRoute = (status: AuthStatus | undefined) => {
  switch (status) {
    case AuthStatus.Authenticated:
      return AuthRoute.AuthProfile;
    case AuthStatus.HaveProfile:
      return AuthRoute.AuthPassword;
    default:
      return AuthRoute.AuthPhone;
  }
};

export const Auth = () => {
  const { user } = useUserStore();

  return (
    <AuthStack.Navigator
      initialRouteName={getRoute(user?.authStatus)}
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
    </AuthStack.Navigator>
  );
};
