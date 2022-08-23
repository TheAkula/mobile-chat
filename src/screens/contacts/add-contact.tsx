import { useStore, useUnit } from "effector-react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Container, SearchInput } from "src/components";
import { ContactsList } from "src/components/contacts";
import {
  $users,
  $usersLoading,
  removeUser,
  useAddMyContact,
  useFetchUsers,
  useRemoveContact,
  useUsersStore,
} from "src/models";
import { AppTheme } from "src/theme";
import styled from "styled-components/native";

export const AddContact = () => {
  const { users, usersLoading } = useUsersStore();
  const fetchUsers = useFetchUsers();
  const addContact = useAddMyContact();
  const removeContact = useRemoveContact();

  useEffect(() => {
    fetchUsers();
  }, []);

  const addedContact = (id: string) => {
    addContact({
      friendId: id,
    });
  };

  const removedContact = (id: string) => {
    removeContact({
      id,
    });
  };

  const remove = useUnit(removeUser);

  // if (usersLoading) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View>
      <Container>
        <SearchContainer>
          <SearchInput placeholderTextColor={AppTheme.colors.white[2]} />
          <Button onPress={() => remove("qwe")}>Delete</Button>
        </SearchContainer>
        <ContactsList
          contacts={users}
          add={addedContact}
          remove={removedContact}
        />
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
