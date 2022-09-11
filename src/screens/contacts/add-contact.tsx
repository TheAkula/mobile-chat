import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
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
  const [fetchUsers, { data: usersData, fetchMore, loading }] =
    useUsersLazyQuery({ notifyOnNetworkStatusChange: true });
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

  const refetchUsers = (value: string) => {
    return fetchUsers({
      variables: {
        page: 0,
        filter: {
          name: value,
        },
      },
    });
  };

  const onChangedSearchValue = (value: string) => {
    setSearchValue(value);

    debounce(refetchUsers, 1000)(value);
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
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <ContactsList
            contacts={usersData?.users.data || []}
            add={addedContact}
            isAdd={isAdd}
            isRemove={isRemove}
            remove={removedContact}
            endReached={onEndReached}
          />
        )}
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
