import { forward, sample } from "effector";
import { messageSendedFx } from "../messages";
import { $usersError, userActivityChangedSubscribeFx } from "../users";
import { updateProfileFx, fetchUserInfoFX, activateFx } from "./effects";
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

sample({
  clock: fetchUserInfoFX.doneData,
  fn: (response) => ({ userId: response.data.myUserInfo.id }),
  target: messageSendedFx,
});

forward({
  from: fetchUserInfoFX.doneData,
  to: userActivityChangedSubscribeFx,
});
