import { useEffect } from "react";
import { Text, View } from "react-native";
import { Container, SearchInput } from "src/components";
import { ContactsList } from "src/components/contacts";
import { useFetchMyContacts, useMyContactsStore } from "src/models";
import { AppTheme } from "src/theme";
import styled from "styled-components/native";

export const MyContacts = () => {
  const { myContacts, myContactsLoading } = useMyContactsStore();
  const fetchMyContacts = useFetchMyContacts();

  useEffect(() => {
    fetchMyContacts();
  }, []);

  if (!myContacts || myContactsLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Container>
        <SearchContainer>
          <SearchInput placeholderTextColor={AppTheme.colors.white[2]} />
        </SearchContainer>
        <ContactsList contacts={myContacts} />
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
