import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Message } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $messages = createStore<DeepPartial<Message>[]>([]);
export const $messagesLoading = createStore(false);
export const $messagesError = createStore<Error | null>(null);

export const $messagesStore = combine({
  messages: $messages,
  messagesLoading: $messagesLoading,
  messagesError: $messagesError,
});

export const useMessagesStore = () => useStore($messagesStore);
