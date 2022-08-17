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

    console.log(responseData, newUser);

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
  .on(fetchUserInfoFX.pending, () => true)
  .on(fetchUserInfoFX.finally, () => false)
  .on(updateProfileFx.pending, () => true)
  .on(updateProfileFx.finally, () => false);
