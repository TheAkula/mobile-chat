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
  .on(fetchUserInfoFX.pending, (payload) => payload)
  .on(updateProfileFx.pending, (payload) => payload);
