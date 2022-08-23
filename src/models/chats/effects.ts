import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  MyChatsDocument,
  MyChatsQuery,
  MyChatsQueryVariables,
} from "src/generated/graphql";

export const fetchMyChatsFx = createEffect(
  async (variables?: MyChatsQueryVariables) => {
    return apolloClient.query<MyChatsQuery>({
      query: MyChatsDocument,
      variables,
    });
  }
);

export const useFetchMyChats = () => useUnit(fetchMyChatsFx);
