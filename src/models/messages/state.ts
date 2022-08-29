import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Message } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $messages = createStore<DeepPartial<Message>[]>([]);
export const $messagesLoading = createStore(false);
export const $fetchMessagesLoading = createStore(false);
export const $messagesError = createStore<Error | null>(null);
export const $messagesPaginationPage = createStore<null | number>(0);
export const $messagesSkip = createStore(0);

export const $messagesStore = combine({
  messages: $messages,
  messagesLoading: $messagesLoading,
  messagesError: $messagesError,
  messagesNextPage: $messagesPaginationPage,
  messagesSkip: $messagesSkip,
});

export const useMessagesStore = () => useStore($messagesStore);
export const useFetchMessagesLoading = () => useStore($fetchMessagesLoading);
