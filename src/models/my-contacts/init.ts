import { addMyContactFx, fetchMyContactsFx, removeContactFx } from "./effects";
import { $myContacts, $myContactsError, $myContactsLoading } from "./state";

$myContacts.on(
  fetchMyContactsFx.doneData,
  (_, contacts) => contacts.data.myFriends
);

$myContacts.on(addMyContactFx.doneData, (prevContacts, response) => {
  if (response.data) {
    return [...prevContacts, response.data.addFriend];
  }
});

$myContacts.on(removeContactFx.doneData, (prevContacts, response) =>
  prevContacts.filter((contact) => contact.id !== response.data?.removeFriend)
);

$myContactsLoading
  .on(fetchMyContactsFx.pending, (_, payload) => payload)
  .on(removeContactFx.pending, (_, payload) => payload)
  .on(addMyContactFx.pending, (_, payload) => payload);

$myContactsError
  .on(fetchMyContactsFx.failData, (_, err) => err)
  .on(removeContactFx.failData, (_, err) => err)
  .on(addMyContactFx.failData, (_, err) => err);
