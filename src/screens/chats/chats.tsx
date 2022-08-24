import { createStackNavigator } from "@react-navigation/stack";
import { ChatsParamsList, ChatsRoute } from "src/navigation/types";
import { AddChat } from "./add-chat";
import { Chat } from "../chat";
import { MyChats } from "./my-chats";

const ChatsStack = createStackNavigator<ChatsParamsList>();

export const Chats = () => {
  return (
    <ChatsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatsStack.Screen name={ChatsRoute.MyChats} component={MyChats} />
      <ChatsStack.Screen name={ChatsRoute.AddChat} component={AddChat} />
    </ChatsStack.Navigator>
  );
};
