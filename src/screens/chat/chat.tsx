import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";
import { Header } from "src/components";
import { InviteButton } from "src/components/chat";
import { useCurrentChatContext } from "src/context";
import { useChatQuery } from "src/generated/graphql";
import { ChatParamsList, ChatRoute } from "src/navigation/types";
import { Invite } from "./invite";
import { Messages } from "./messages";

const ChatStack = createStackNavigator<ChatParamsList>();

export const Chat = () => {
  const { currentChat } = useCurrentChatContext();
  const {
    data: chatData,
    error,
    loading,
  } = useChatQuery({
    variables: {
      chatId: currentChat,
    },
  });

  if (!chatData || loading) {
    return <ActivityIndicator />;
  }

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
              buttons={!chatData?.chat.isFriendsChat ? <InviteButton /> : <></>}
            />
          ),
        })}
      />
      {!chatData?.chat.isFriendsChat && (
        <ChatStack.Screen name={ChatRoute.Invite} component={Invite} />
      )}
    </ChatStack.Navigator>
  );
};
