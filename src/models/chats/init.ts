import { forward, sample } from "effector";
import { addMessage, readMessagesFx, sendMessageFx } from "../messages";
import { fetchMyChatsFx } from "./effects";
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
  });

$chatsLoading.on(fetchMyChatsFx.pending, (_, payload) => payload);

$chatsError.on(fetchMyChatsFx.failData, (_, err) => err);

$currentChat.on(setCurrentChat, (_, id) => id);
