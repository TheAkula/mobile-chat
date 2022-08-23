import { combine, createStore } from "effector";
import { useStore } from "effector-react";
import { Chat, Message, User, UserLink } from "src/generated/graphql";
import { DeepPartial } from "src/types";

export const $chats = createStore<DeepPartial<Chat>[]>([]);

export const $chatsLoading = createStore(false);

export const $chatsError = createStore<Error | null>(null);

export const $chatsStore = combine({
  myChats: $chats,
  myChatsLoading: $chatsLoading,
  myError: $chatsError,
});

export const useMyChatsStore = () => useStore($chatsStore);
