import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  TabBarButton,
  Chats as ChatsIcon,
  MessageCircle,
} from "src/components";
import { Chats, Contacts } from "src/screens";
import { AppTheme } from "src/theme";
import { MainParamList, MainRoute, RootParamList, RootRoute } from "./types";

type Props = StackScreenProps<RootParamList, RootRoute.Main>;

const Tab = createBottomTabNavigator<MainParamList>();

export const Main = ({ route }: Props) => {
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
        name={MainRoute.Chats}
        component={Chats}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <TabBarButton
              title="Chats"
              {...props}
              active={navigation.isFocused()}
            >
              <ChatsIcon />
            </TabBarButton>
          ),
        })}
      />
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
              <MessageCircle color={AppTheme.colors.white[0]} />
            </TabBarButton>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
