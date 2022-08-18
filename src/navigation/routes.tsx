import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Text, View } from "react-native";
import { Chevron } from "src/components";
import { Auth } from "src/screens";
import { Main } from "./main";
import { AppTheme } from "src/theme";
import { useFetchUserInfo, useUserStore } from "src/models";
import { RootParamList, RootRoute } from "./types";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "src/constants";

const RootStack = createStackNavigator<RootParamList>();

export const Routes = () => {
  const { $user } = useUserStore();
  const fetchUserInfo = useFetchUserInfo();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN).then((token) => {
      if (token) {
        fetchUserInfo()
          .catch((err) => {})
          .finally(() => {
            setIsFetched(true);
          });
      } else {
        setIsFetched(true);
      }
    });
  }, []);

  if (!isFetched) {
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
        screenOptions={{
          headerBackImage: () => <Chevron />,
          headerTitle: ({ children }) => <Text>{children}</Text>,
          headerStyle: {
            backgroundColor: AppTheme.colors.blue[7],
          },
          headerShadowVisible: false,
        }}
      >
        {$user?.haveProfile && (
          <RootStack.Screen name={RootRoute.Main} component={Main} />
        )}
        {!$user?.haveProfile && (
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
