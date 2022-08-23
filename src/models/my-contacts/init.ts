import {
  addMyContactFx,
  fetchMyContactsFx,
  $myContacts,
  $myContactsLoading,
  removeContactFx,
} from ".";

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
  .on(fetchMyContactsFx.pending, (payload) => payload)
  .on(removeContactFx.pending, (payload) => payload)
  .on(addMyContactFx.pending, (payload) => payload);
