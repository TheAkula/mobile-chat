import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TabBarButton,
  Chats as ChatsIcon,
  MessageCircle,
  MoreHorizontal,
  Header,
} from "src/components";
import {
  useMyInfoQuery,
  useUserActivityChangedSubscription,
} from "src/generated/graphql";
import { useMessageSended } from "src/hooks";
import { Chats, Contacts, More } from "src/screens";
import { AppTheme } from "src/theme";
import { MainParamList, MainRoute } from "./types";

const Tab = createBottomTabNavigator<MainParamList>();

export const Main = () => {
  const { data } = useMyInfoQuery();

  useMessageSended(data?.myUserInfo.id as string);
  useUserActivityChangedSubscription();

  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        tabBarStyle: {
          backgroundColor: AppTheme.colors.blue[7],
          borderTopWidth: 0,
          borderTopColor: AppTheme.colors.blue[7],
        },
      }}
    >
      <Tab.Screen
        name={MainRoute.Contacts}
        component={Contacts}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: (props) => (
            <TabBarButton
              title="Contacts"
              {...props}
              active={navigation.isFocused()}
            >
              <ChatsIcon />
            </TabBarButton>
          ),
        })}
      />
      <Tab.Screen
        name={MainRoute.Chats}
        component={Chats}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: (props) => (
            <TabBarButton
              title="Chats"
              {...props}
              active={navigation.isFocused()}
            >
              <MessageCircle color={AppTheme.colors.white[0]} />
            </TabBarButton>
          ),
        })}
      />
      <Tab.Screen
        name={MainRoute.More}
        component={More}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <TabBarButton
              title="More"
              {...props}
              active={navigation.isFocused()}
            >
              <MoreHorizontal color={AppTheme.colors.white[0]} />
            </TabBarButton>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
