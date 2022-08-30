import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  CreateChatDocument,
  CreateChatMutationVariables,
  MyChatsDocument,
  MyChatsQuery,
  CreateChatMutation,
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

export const createChatFx = createEffect(
  (variables: CreateChatMutationVariables) => {
    return apolloClient.mutate<CreateChatMutation>({
      mutation: CreateChatDocument,
      variables,
    });
  }
);

export const useFetchMyChats = () => useUnit(fetchMyChatsFx);
export const useCreateChat = () => useUnit(createChatFx);
