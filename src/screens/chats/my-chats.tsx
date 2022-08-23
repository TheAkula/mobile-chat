import { useEffect } from "react";
import { Text, View } from "react-native";
import { Container, SearchInput } from "src/components";
import { ChatsList } from "src/components/chats";
import { useFetchMyChats, useMyChatsStore } from "src/models";
import { AppTheme } from "src/theme";
import styled from "styled-components/native";

export const MyChats = () => {
  const { myChats, myChatsLoading } = useMyChatsStore();
  const fetchMyChats = useFetchMyChats();

  useEffect(() => {
    if (!myChats || !myChats.length) {
      fetchMyChats();
    }
  }, []);

  if (!myChats || myChatsLoading) {
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
        <ChatsList chats={myChats} />
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
