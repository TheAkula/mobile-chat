import { Text, View } from "react-native";
import { Container } from "src/components";
import { ContactsList } from "src/components/contacts";
import { useContactsQuery } from "src/generated/graphql";

export const MyContacts = () => {
  const { data: myContactsData, loading: myContactsLoading } =
    useContactsQuery();

  if (!myContactsData?.myFriends || myContactsLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Container>
        <ContactsList contacts={myContactsData.myFriends} />
      </Container>
    </View>
  );
};
