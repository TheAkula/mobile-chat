import { fetchMessagesFx } from "./effects";
import { $messages, $messagesError, $messagesLoading } from "./state";

$messages.on(fetchMessagesFx.doneData, (_, response) => response.data.messages);

$messagesLoading.on(fetchMessagesFx.pending, (_, payload) => payload);

$messagesError.on(fetchMessagesFx.failData, (_, err) => err);
