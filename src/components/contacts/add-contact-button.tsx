import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Plus } from "src/components";
import { ContactsParamList, ContactsRoute } from "src/navigation/types";

type NavProp = StackNavigationProp<ContactsParamList, ContactsRoute.MyContacts>;

export const AddContactButton = () => {
  const { push } = useNavigation<NavProp>();

  return (
    <TouchableOpacity onPress={() => push(ContactsRoute.AddContact)}>
      <Plus />
    </TouchableOpacity>
  );
};
