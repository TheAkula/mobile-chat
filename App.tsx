import { useMyInfoQuery } from "src/generated/graphql";
import { Routes } from "src/navigation";
import styled from "styled-components/native";

export function App() {
  const { data: userData } = useMyInfoQuery();

  return (
    <AppContainer>
      {userData && <Routes userId={userData.myUserInfo.id} />}
    </AppContainer>
  );
}

const AppContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[7]};
  flex: 1;
`;
