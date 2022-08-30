import { addMyContactFx, removeContactFx } from "../my-contacts";
import { fetchContactInfoFx } from "./effects";
import { $contact, $contactError, $contactLoading } from "./state";

$contact
  .on(fetchContactInfoFx.doneData, (_, response) => {
    return response.data.user;
  })
  .on(removeContactFx.done, (prev, { params }) => {
    if (prev.id === params.id) {
      return {
        ...prev,
        isFriend: false,
      };
    }
  })
  .on(addMyContactFx.done, (prev, { params }) => {
    if (prev.id === params.friendId) {
      return {
        ...prev,
        isFriend: true,
      };
    }
  });

$contactLoading.on(fetchContactInfoFx.pending, (_, payload) => payload);

$contactError.on(fetchContactInfoFx.failData, (_, err) => err);
