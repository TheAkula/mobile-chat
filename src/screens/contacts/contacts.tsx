import { createStackNavigator } from "@react-navigation/stack";
import { ContactsParamList, ContactsRoute } from "src/navigation/types";
import { AddContact } from "./add-contact";
import { MyContacts } from "./my-contacts";

const ContactsStack = createStackNavigator<ContactsParamList>();

export const Contacts = () => {
  return (
    <ContactsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ContactsRoute.MyContacts}
    >
      <ContactsStack.Screen
        name={ContactsRoute.MyContacts}
        component={MyContacts}
      />
      <ContactsStack.Screen
        name={ContactsRoute.AddContact}
        component={AddContact}
      />
    </ContactsStack.Navigator>
  );
};
