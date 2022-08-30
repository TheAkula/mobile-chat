import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "src/components";
import { InviteButton } from "src/components/chat";
import { useMyChatsStore } from "src/models";
import { ChatParamsList, ChatRoute } from "src/navigation/types";
import { Invite } from "./invite";
import { Messages } from "./messages";

const ChatStack = createStackNavigator<ChatParamsList>();

export const Chat = () => {
  const { currentChat, myChats } = useMyChatsStore();

  const chat = myChats.find((c) => c.id === currentChat);

  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen
        name={ChatRoute.Messages}
        component={Messages}
        options={({
          route: {
            params: { name },
          },
        }) => ({
          headerShown: true,
          title: name,
          header: (props) => (
            <Header
              {...props}
              back
              buttons={!chat?.isFriendsChat ? <InviteButton /> : <></>}
            />
          ),
        })}
      />
      {!chat?.isFriendsChat && (
        <ChatStack.Screen name={ChatRoute.Invite} component={Invite} />
      )}
    </ChatStack.Navigator>
  );
};
