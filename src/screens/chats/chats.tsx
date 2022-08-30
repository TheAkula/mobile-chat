import { createStackNavigator } from "@react-navigation/stack";
import { ChatsParamsList, ChatsRoute } from "src/navigation/types";
import { AddChat } from "./add-chat";
import { MyChats } from "./my-chats";
import { Header } from "src/components";
import { AddChatButton } from "src/components/chats";

const ChatsStack = createStackNavigator<ChatsParamsList>();

export const Chats = () => {
  return (
    <ChatsStack.Navigator screenOptions={{}}>
      <ChatsStack.Screen
        name={ChatsRoute.MyChats}
        options={{
          header: (props) => (
            <Header {...props} back={false} buttons={<AddChatButton />} />
          ),
        }}
        component={MyChats}
      />
      <ChatsStack.Screen
        name={ChatsRoute.AddChat}
        options={{
          header: (props) => <Header {...props} back />,
        }}
        component={AddChat}
      />
    </ChatsStack.Navigator>
  );
};
