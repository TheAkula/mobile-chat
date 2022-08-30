import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Chat } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $chat = createStore<DeepPartial<Chat>>({});

export const $chatLoading = createStore(false);

export const $chatError = createStore<Error | null>(null);

export const $chatStore = combine({
  chat: $chat,
  chatLoading: $chatLoading,
  chatError: $chatError,
});

export const useChatStore = () => useStore($chatStore);
