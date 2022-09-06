import { changeActivity } from "../users";
import { addMyContactFx, fetchMyContactsFx, removeContactFx } from "./effects";
import { $myContacts, $myContactsError, $myContactsLoading } from "./state";

$myContacts
  .on(fetchMyContactsFx.doneData, (_, contacts) => contacts.data.myFriends)
  .on(addMyContactFx.doneData, (prevContacts, response) => {
    if (response.data) {
      return [...prevContacts, response.data.addFriend];
    }
  })
  .on(removeContactFx.doneData, (prevContacts, response) =>
    prevContacts.filter((contact) => contact.id !== response.data?.removeFriend)
  )
  .on(changeActivity, (prev, payload) => {
    const userIndex = prev.findIndex((u) => u.id === payload.id);

    if (userIndex !== -1) {
      const updatedUsers = [...prev];

      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...payload,
      };

      return updatedUsers;
    }
  });

$myContactsLoading
  .on(fetchMyContactsFx.pending, (_, payload) => payload)
  .on(removeContactFx.pending, (_, payload) => payload)
  .on(addMyContactFx.pending, (_, payload) => payload);

$myContactsError
  .on(fetchMyContactsFx.failData, (_, err) => err)
  .on(removeContactFx.failData, (_, err) => err)
  .on(addMyContactFx.failData, (_, err) => err);
