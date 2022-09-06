import { forward, sample } from "effector";
import { addMessage, readMessagesFx, sendMessageFx } from "../messages";
import { createChatFx, createPersonalChatFx, fetchMyChatsFx } from "./effects";
import { receiveMessage, setCurrentChat } from "./events";
import { $chats, $chatsError, $chatsLoading, $currentChat } from "./state";

$chats
  .on(fetchMyChatsFx.doneData, (_, response) => response.data.myChats)
  .on(addMessage, (prev, payload) => {
    const updatedChatIndex = prev.findIndex(
      (chat) => chat.id === payload.chat?.id
    );
    const updatedChats = [...prev];

    if (updatedChatIndex !== -1) {
      const notSeen = updatedChats[updatedChatIndex].notSeen;

      updatedChats[updatedChatIndex] = {
        ...updatedChats[updatedChatIndex],
        messages: [payload],
        notSeen: notSeen ? notSeen + 1 : 1,
      };

      return updatedChats;
    }
  })
  .on(sendMessageFx.done, (prev, { params, result }) => {
    if (!result.data?.createMessage) {
      return prev;
    }
    const updatedChatIndex = prev.findIndex(
      (chat) => chat.id === params.chatId
    );

    const updatedChats = [...prev];

    if (updatedChatIndex !== -1) {
      updatedChats[updatedChatIndex] = {
        ...updatedChats[updatedChatIndex],
        notSeen: 0,
        messages: [result.data?.createMessage],
      };

      return updatedChats;
    }
  })
  .on(readMessagesFx.done, (prev, { result, params }) => {
    const updatedChats = [...prev];

    const chatIndex = updatedChats.findIndex(
      (chat) => chat.id === result.data?.readMessages[0].chat.id
    );

    const notSeen = updatedChats[chatIndex].notSeen;

    updatedChats[chatIndex] = {
      ...updatedChats[chatIndex],
      notSeen: notSeen ? notSeen - params.messagesIds.length : 0,
    };
    return updatedChats;
  })
  .on(createChatFx.doneData, (prev, response) => {
    if (response.data?.createChat) {
      return [...prev, response.data?.createChat];
    }
  })
  .on(createPersonalChatFx.doneData, (prev, response) => {
    const exChat = prev.find(
      (chat) => chat.id === response.data?.createPersonalChat.id
    );

    if (!exChat && response.data?.createPersonalChat) {
      return [...prev, response.data?.createPersonalChat];
    }
  });

$chatsLoading.on(fetchMyChatsFx.pending, (_, payload) => payload);

$chatsError.on(fetchMyChatsFx.failData, (_, err) => err);

$currentChat.on(setCurrentChat, (_, id) => id);
