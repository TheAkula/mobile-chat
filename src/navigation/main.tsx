import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TabBarButton,
  Chats as ChatsIcon,
  MessageCircle,
  MoreHorizontal,
} from "src/components";
import { Chats, Contacts, More } from "src/screens";
import { AppTheme } from "src/theme";
import { MainParamList, MainRoute } from "./types";

const Tab = createBottomTabNavigator<MainParamList>();

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: AppTheme.colors.blue[7],
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name={MainRoute.Contacts}
        component={Contacts}
        options={({ navigation }) => ({
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
