import { myContactsFx, $myContacts, $myContactsLoading } from ".";

$myContacts.on(myContactsFx.doneData, (_, contacts) => contacts.data.myFriends);

$myContactsLoading
  .on(myContactsFx.pending, () => true)
  .on(myContactsFx.finally, () => false);
