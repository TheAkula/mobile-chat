import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Container, SearchInput } from "src/components";
import { ContactsList } from "src/components/contacts";
import {
  ContactsDocument,
  ContactsQuery,
  useAddContactMutation,
  User,
  useRemoveContactMutation,
  UsersDocument,
  UsersQuery,
  useUsersLazyQuery,
  useUsersQuery,
} from "src/generated/graphql";
import { useAddContact, useRemoveContact } from "src/hooks";

import { AppTheme } from "src/theme";
import styled from "styled-components/native";

export const AddContact = () => {
  const [fetchUsers, { data: usersData, fetchMore }] = useUsersLazyQuery();
  const [addContact] = useAddContact();
  const [removeContact] = useRemoveContact();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const addedContact = (id: string) => {
    addContact({
      variables: {
        friendId: id,
      },
    });
  };

  const removedContact = (id: string) => {
    removeContact({
      variables: {
        id,
      },
    });
  };

  const onEndReached = () => {
    if (usersData?.users.nextPage) {
      fetchMore({
        variables: {
          page: usersData?.users.nextPage,
          filter: {
            name: searchValue,
          },
        },
      });
    }
  };

  const onChangedSearchValue = (value: string) => {
    setSearchValue(value);

    debounce(() => {
      fetchUsers({
        variables: {
          page: 0,
          filter: {
            name: value,
          },
        },
      });
    }, 1000)();
  };

  const isAdd = (item: Partial<User>) => {
    return !item.isFriend;
  };
  const isRemove = (item: Partial<User>) => {
    return !!item.isFriend;
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
          contacts={usersData?.users.data || []}
          add={addedContact}
          isAdd={isAdd}
          isRemove={isRemove}
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
