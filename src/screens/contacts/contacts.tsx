import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "src/components";
import { AddContactButton } from "src/components/contacts";
import { ContactsParamList, ContactsRoute } from "src/navigation/types";
import { AddContact } from "./add-contact";
import { MyContacts } from "./my-contacts";

const ContactsStack = createStackNavigator<ContactsParamList>();

export const Contacts = () => {
  return (
    <ContactsStack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} back={!!props.back} />,
      }}
      initialRouteName={ContactsRoute.MyContacts}
    >
      <ContactsStack.Screen
        name={ContactsRoute.MyContacts}
        component={MyContacts}
        options={{
          header: (props) => (
            <Header
              {...props}
              buttons={<AddContactButton />}
              back={!!props.back}
            />
          ),
        }}
      />
      <ContactsStack.Screen
        name={ContactsRoute.AddContact}
        component={AddContact}
      />
    </ContactsStack.Navigator>
  );
};
