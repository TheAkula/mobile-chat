import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  AddToChatDocument,
  AddToChatMutation,
  AddToChatMutationVariables,
  ChatDocument,
  ChatQuery,
  ChatQueryVariables,
  RemoveFromChatDocument,
  RemoveFromChatMutation,
  RemoveFromChatMutationVariables,
} from "src/generated/graphql";

export const fetchChatFx = createEffect((variables: ChatQueryVariables) => {
  return apolloClient.query<ChatQuery>({
    query: ChatDocument,
    variables,
  });
});

export const addToChatFx = createEffect(
  (variables: AddToChatMutationVariables) => {
    return apolloClient.mutate<AddToChatMutation>({
      mutation: AddToChatDocument,
      variables,
    });
  }
);

export const removeFromChatFx = createEffect(
  (variables: RemoveFromChatMutationVariables) => {
    return apolloClient.mutate<RemoveFromChatMutation>({
      mutation: RemoveFromChatDocument,
      variables,
    });
  }
);

export const useFetchChat = () => useUnit(fetchChatFx);
export const useAddToChat = () => useUnit(addToChatFx);
export const useRemoveFromChat = () => useUnit(removeFromChatFx);
