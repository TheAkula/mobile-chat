import { fetchMyChatsFx } from "./effects";
import { $chats, $chatsError, $chatsLoading } from "./state";

$chats.on(fetchMyChatsFx.doneData, (_, response) => response.data.myChats);

$chatsLoading.on(fetchMyChatsFx.pending, (_, payload) => payload);

$chatsError.on(fetchMyChatsFx.failData, (_, err) => err);
