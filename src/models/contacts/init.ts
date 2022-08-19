import { fetchMyContactsFx, $myContacts, $myContactsLoading } from ".";

$myContacts.on(
  fetchMyContactsFx.doneData,
  (_, contacts) => contacts.data.myFriends
);

$myContactsLoading
  .on(fetchMyContactsFx.pending, () => true)
  .on(fetchMyContactsFx.finally, () => false);
