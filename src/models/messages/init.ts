import { sample } from "effector";
import { $currentChat } from "../chats";
import { $user } from "../user";
import {
  fetchMessagesFx,
  fetchMoreMessagesFx,
  readMessagesFx,
  sendMessageFx,
} from "./effects";
import { addMessage, pushMessage, updateMessage } from "./events";
import {
  $fetchMessagesLoading,
  $messages,
  $messagesError,
  $messagesLoading,
  $messagesPaginationPage,
  $messagesSkip,
} from "./state";

$messages
  .on(fetchMessagesFx.doneData, (_, response) => {
    return response.data.messages.data;
  })
  // .on(sendMessageFx.doneData, (prev, response) => {
  //   if (response.data?.createMessage) {
  //     return [response.data?.createMessage, ...prev];
  //   }
  // })
  .on(pushMessage, (prev, message) => [
    message,
    ...prev.map((mes) => {
      const haveUser = mes.usersSeen?.find(
        (user) => user?.id === message.author?.id
      );
      return {
        ...mes,
        usersSeen: haveUser
          ? mes.usersSeen
          : [...(mes.usersSeen || []), { id: message.author?.id }],
      };
    }),
  ])
  // .on(updateMessage, (prev, message) => {
  //   const updatedMessages = [...prev];
  //   const updatedMessageIndex = updatedMessages.findIndex(
  //     (mes) => mes.id === message.id
  //   );

  //   updatedMessages[updatedMessageIndex] = {
  //     ...updatedMessages[updatedMessageIndex],
  //     ...message,
  //   };

  //   return updatedMessages;
  // })
  .on(fetchMoreMessagesFx.doneData, (prev, response) => {
    return [...prev, ...response.data.messages.data];
  });

$messagesPaginationPage
  .on(
    fetchMessagesFx.doneData,
    (_, response) => response.data.messages.nextPage
  )
  .on(
    fetchMoreMessagesFx.doneData,
    (_, response) => response.data.messages.nextPage
  );

$messagesLoading
  .on(fetchMessagesFx.pending, (_, payload) => payload)
  .on(sendMessageFx.pending, (_, payload) => payload);

$messagesError
  .on(fetchMessagesFx.failData, (_, err) => err)
  .on(sendMessageFx.failData, (_, err) => err);

$fetchMessagesLoading.on(fetchMessagesFx.pending, (_, payload) => payload);

$messagesSkip
  .on(sendMessageFx.done, (prev) => prev + 1)
  .on(addMessage, (prev) => prev + 1)
  .on(fetchMessagesFx.done, () => 0);

sample({
  clock: addMessage,
  source: {
    currentChat: $currentChat,
    user: $user,
  },
  fn: (_, message) => {
    return message;
  },
  filter({ currentChat, user }, message) {
    return currentChat === message.chat?.id;
  },
  target: pushMessage,
});

sample({
  clock: readMessagesFx.done,
  source: {
    messages: $messages,
    user: $user,
  },
  fn: ({ messages, user }, { params }) => {
    const updatedMessages = messages.slice();

    if (!Array.isArray(params.messagesIds)) {
      return messages;
    }

    console.log(params.messagesIds);

    params.messagesIds.forEach((messageId) => {
      const readedMessageIndex = updatedMessages.findIndex(
        (message) => message.id === messageId
      );

      console.log(user?.id);

      updatedMessages[readedMessageIndex] = {
        ...updatedMessages[readedMessageIndex],
        usersSeen: [
          ...(updatedMessages[readedMessageIndex].usersSeen || []),
          { id: user?.id },
        ],
      };
    });

    return updatedMessages;
  },
  target: $messages,
});
