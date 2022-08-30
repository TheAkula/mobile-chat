import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  MessagesDocument,
  MessageSendedDocument,
  MessageSendedSubscription,
  MessageSendedSubscriptionVariables,
  MessagesQuery,
  MessagesQueryVariables,
  MessageUpdatedDocument,
  MessageUpdatedSubscription,
  MessageUpdatedSubscriptionVariables,
  ReadMessagesDocument,
  ReadMessagesMutation,
  ReadMessagesMutationVariables,
  SendMessageDocument,
  SendMessageMutation,
  SendMessageMutationVariables,
} from "src/generated/graphql";
import { addMessage, updateMessage } from "./events";

export const fetchMessagesFx = createEffect(
  async (variables: MessagesQueryVariables) => {
    const res = await apolloClient.query<MessagesQuery>({
      query: MessagesDocument,
      variables,
    });

    return res;
  }
);

export const refetchMessagesFx = createEffect(() => {
  return apolloClient.refetchQueries({
    include: ["messages"],
  });
});

export const fetchMoreMessagesFx = createEffect(
  (variables: MessagesQueryVariables) => {
    return apolloClient
      .watchQuery<MessagesQuery>({
        query: MessagesDocument,
      })
      .fetchMore<MessagesQuery>({
        variables,
      });
  }
);

export const sendMessageFx = createEffect(
  (variables: SendMessageMutationVariables) => {
    return apolloClient.mutate<SendMessageMutation>({
      mutation: SendMessageDocument,
      variables,
    });
  }
);

export const messageSendedFx = createEffect(
  (variables: MessageSendedSubscriptionVariables) => {
    return apolloClient
      .subscribe<MessageSendedSubscription>({
        query: MessageSendedDocument,
        variables,
      })
      .subscribe({
        next(data) {
          console.log(data, "sub");

          if (data.data?.messageCreated) {
            addMessage(data.data.messageCreated);
          }
        },
        error(errorValue) {
          console.log(errorValue);
        },
      });
  }
);

export const messageUpdatedFx = createEffect(
  (variables: MessageUpdatedSubscriptionVariables) => {
    return apolloClient
      .subscribe<MessageUpdatedSubscription>({
        query: MessageUpdatedDocument,
        variables,
      })
      .subscribe({
        next(data) {
          if (data.data?.messageUpdated) {
            updateMessage(data.data.messageUpdated);
          }
        },
      });
  }
);

export const readMessagesFx = createEffect(
  (variables: ReadMessagesMutationVariables) => {
    return apolloClient.mutate<ReadMessagesMutation>({
      mutation: ReadMessagesDocument,
      variables,
    });
  }
);

export const useFetchMessages = () => useUnit(fetchMessagesFx);
export const useSendMessage = () => useUnit(sendMessageFx);
export const useMessageSendedSubscribe = () => useUnit(messageSendedFx);
export const useMessageUpdatedSubscribe = () => useUnit(messageUpdatedFx);
export const useReadMessages = () => useUnit(readMessagesFx);
export const useFetchMoreMessages = () => useUnit(fetchMoreMessagesFx);
export const useRefetchMessages = () => useUnit(refetchMessagesFx);
