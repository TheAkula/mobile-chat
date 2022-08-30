import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { ChatParamsList, ChatRoute } from "src/navigation/types";
import { Invite } from "src/components";

type NavProp = StackNavigationProp<ChatParamsList, ChatRoute>;

export const InviteButton = () => {
  const { push } = useNavigation<NavProp>();

  return (
    <TouchableOpacity onPress={() => push(ChatRoute.Invite)}>
      <Invite />
    </TouchableOpacity>
  );
};
