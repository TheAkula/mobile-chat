import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AsyncStorageKey } from "src/constants";
import { useMyInfoLazyQuery, useMyInfoQuery } from "src/generated/graphql";
import { Routes } from "src/navigation";
import styled from "styled-components/native";

export function App() {
  const [fetchInfo, { data: userData, loading, error }] = useMyInfoLazyQuery();

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN).then((token) => {
      if (token) {
        fetchInfo();
      }
    });
  }, [userData]);

  return (
    <AppContainer>
      <Routes />
    </AppContainer>
  );
}

const AppContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[7]};
  flex: 1;
`;
