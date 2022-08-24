import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  MessagesDocument,
  MessagesQuery,
  MessagesQueryVariables,
} from "src/generated/graphql";

export const fetchMessagesFx = createEffect(
  (variables: MessagesQueryVariables) => {
    return apolloClient.query<MessagesQuery>({
      query: MessagesDocument,
      variables,
    });
  }
);

export const useFetchMessages = () => useUnit(fetchMessagesFx);
