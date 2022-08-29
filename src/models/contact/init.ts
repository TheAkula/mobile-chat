import { fetchContactInfoFx } from "./effects";
import { $contact, $contactError, $contactLoading } from "./state";

$contact.on(fetchContactInfoFx.doneData, (_, response) => {
  return response.data.user;
});

$contactLoading.on(fetchContactInfoFx.pending, (_, payload) => payload);

$contactError.on(fetchContactInfoFx.failData, (_, err) => err);
