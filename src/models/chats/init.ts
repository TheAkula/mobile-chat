import { fetchMyChatsFx } from "./effects";
import { $chats, $chatsError, $chatsLoading } from "./state";

$chats.on(fetchMyChatsFx.doneData, (_, response) => response.data.myChats);

$chatsLoading.on(fetchMyChatsFx.pending, (payload) => payload);

$chatsError.on(fetchMyChatsFx.fail, (err) => err);
