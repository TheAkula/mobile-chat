import { addToChatFx, fetchChatFx, removeFromChatFx } from "./effects";
import { $chat } from "./state";

$chat
  .on(fetchChatFx.doneData, (_, response) => {
    if (response.data.chat) {
      return response.data.chat;
    }
  })
  .on(addToChatFx.doneData, (prev, response) => {
    if (response.data?.addToChat) {
      return {
        ...prev,
        users: [...(prev.users || []), response.data.addToChat],
      };
    }
  })
  .on(removeFromChatFx.doneData, (prev, response) => {
    return {
      ...prev,
      users: prev.users?.filter(
        (user) => user.id !== response.data?.removeFromChat.id
      ),
    };
  });
