import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { AuthCode, AuthEmail, AuthProfile } from "src/components/auth";
import { useUserStore } from "src/models";
import { AuthParamList, AuthRoute } from "src/navigation/types";

const AuthStack = createStackNavigator<AuthParamList>();

export const Auth = () => {
  const { $user } = useUserStore();

  const routeName = $user?.isAuthenticated
    ? AuthRoute.AuthProfile
    : AuthRoute.AuthPhone;

  return (
    <AuthStack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={AuthRoute.AuthPhone} component={AuthEmail} />
      <AuthStack.Screen name={AuthRoute.AuthCode} component={AuthCode} />
      <AuthStack.Screen name={AuthRoute.AuthProfile} component={AuthProfile} />
    </AuthStack.Navigator>
  );
};
