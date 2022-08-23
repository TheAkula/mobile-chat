import { useEffect } from "react";
import { Text, View } from "react-native";
import { Container, SearchInput } from "src/components";
import { ContactsList } from "src/components/contacts";
import {
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
    if (!users || !users.length) {
      fetchUsers();
    }
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

  if (usersLoading || !users) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(users);

  return (
    <View>
      <Container>
        <SearchContainer>
          <SearchInput placeholderTextColor={AppTheme.colors.white[2]} />
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
