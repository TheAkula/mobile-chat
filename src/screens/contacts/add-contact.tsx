import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Container, SearchInput } from "src/components";
import { ContactsList } from "src/components/contacts";
import {
  useAddMyContact,
  useFetchMoreUsers,
  useFetchUsers,
  useRemoveContact,
  useUsersStore,
} from "src/models";
import { AppTheme } from "src/theme";
import styled from "styled-components/native";

export const AddContact = () => {
  const { users, usersNextPage } = useUsersStore();
  const fetchUsers = useFetchUsers();
  const addContact = useAddMyContact();
  const removeContact = useRemoveContact();
  const fetchMoreUsers = useFetchMoreUsers();
  const [searchValue, setSearchValue] = useState("");

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

  const onEndReached = () => {
    if (usersNextPage) {
      fetchMoreUsers({
        page: usersNextPage,
        filter: {
          name: searchValue,
        },
      });
    }
  };

  const onChangedSearchValue = (value: string) => {
    setSearchValue(value);

    debounce(() => {
      fetchUsers({
        page: 0,
        filter: {
          name: value,
        },
      });
    }, 1000)();
  };

  return (
    <View>
      <Container>
        <SearchContainer>
          <SearchInput
            placeholderTextColor={AppTheme.colors.white[2]}
            value={searchValue}
            onChangeText={onChangedSearchValue}
          />
        </SearchContainer>
        <ContactsList
          contacts={users}
          add={addedContact}
          remove={removedContact}
          endReached={onEndReached}
        />
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
