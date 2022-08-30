import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Plus } from "src/components";
import { ChatsParamsList, ChatsRoute } from "src/navigation/types";

type NavProp = StackNavigationProp<ChatsParamsList, ChatsRoute.MyChats>;

export const AddChatButton = () => {
  const { push } = useNavigation<NavProp>();

  return (
    <TouchableOpacity onPress={() => push(ChatsRoute.AddChat)}>
      <Plus />
    </TouchableOpacity>
  );
};
