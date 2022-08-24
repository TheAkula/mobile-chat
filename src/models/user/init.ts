import { $usersError } from "../users";
import { updateProfileFx, fetchUserInfoFX } from "./effects";
import { $user, $userLoading } from "./state";

$user
  .on(fetchUserInfoFX.doneData, (prev, newUser) => {
    const responseData = newUser.data?.myUserInfo;

    if (prev) {
      return {
        ...prev,
        ...responseData,
      };
    }

    return {
      ...responseData,
    };
  })
  .on(updateProfileFx.doneData, (prev, newUser) => {
    const responseData = newUser.data?.updateUser;

    if (prev) {
      return {
        ...prev,
        ...responseData,
      };
    }

    return {
      ...responseData,
    };
  });

$userLoading
  .on(fetchUserInfoFX.pending, (_, payload) => payload)
  .on(updateProfileFx.pending, (_, payload) => payload);

$usersError
  .on(fetchUserInfoFX.failData, (_, err) => err)
  .on(updateProfileFx.failData, (_, err) => err);
