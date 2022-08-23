import { sample } from "effector";
import {
  $auth,
  signupWith2faFx,
  $authLoading,
  $authError,
  setTokenFx,
  confirmSignupWith2faFx,
  signinFx,
} from ".";
import { fetchUserInfoFX } from "../user";

$auth
  .on(signupWith2faFx.doneData, (prev, payload) => {
    return {
      ...prev,
      ...payload.data?.signUpWith2fa,
    };
  })
  .on(confirmSignupWith2faFx.doneData, (prev, payload) => {
    return {
      ...prev,
      userToken: payload.data?.confirmSignUpWith2fa.userToken || undefined,
    };
  });

$authLoading.on(signupWith2faFx.pending, (payload) => payload);

$authError.on(signupWith2faFx.failData, (_, err) => err);

sample({
  clock: signupWith2faFx.doneData,
  fn: (data) => {
    return data.data?.signUpWith2fa.userToken || "";
  },
  target: setTokenFx,
});

sample({
  clock: confirmSignupWith2faFx.doneData,
  fn: (data) => data.data?.confirmSignUpWith2fa.userToken || "",
  target: setTokenFx,
});

sample({
  clock: signinFx.doneData,
  fn: (data) => data.data?.login.userToken || "",
  target: setTokenFx,
});

sample({
  clock: signinFx.done,
  target: fetchUserInfoFX,
});
