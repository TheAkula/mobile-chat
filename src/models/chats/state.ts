import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Chat } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $chats = createStore<DeepPartial<Chat>[]>([]);

export const $chatsLoading = createStore(false);

export const $chatsError = createStore<Error | null>(null);

export const $chatsStore = combine({
  myChats: $chats,
  myChatsLoading: $chatsLoading,
  myError: $chatsError,
});

export const $currentChat = createStore("");

export const useMyChatsStore = () => useStore($chatsStore);
