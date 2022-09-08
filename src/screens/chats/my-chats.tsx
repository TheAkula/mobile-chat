import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "src/components";
import { ChatsList } from "src/components/chats";
import { useMyChatsQuery } from "src/generated/graphql";
import styled from "styled-components/native";

export const MyChats = () => {
  const { data: myChatsData, loading: myChatsLoading } = useMyChatsQuery();

  if (!myChatsData?.myChats || myChatsLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Container>
        <ChatsList chats={myChatsData.myChats} />
      </Container>
    </View>
  );
};

const SearchContainer = styled.View`
  margin-top: 16px;
`;
