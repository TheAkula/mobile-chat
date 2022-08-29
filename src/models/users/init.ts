import { $users, $usersError, $usersLoading } from "./state";
import { addMyContactFx, removeContactFx } from "../my-contacts";
import { fetchUsersFx } from "./effects";

$users
  .on(fetchUsersFx.doneData, (_, data) => data.data.users.data)
  .on(addMyContactFx.doneData, (prev, response) => {
    const index = prev.findIndex(
      (user) => user.id === response.data?.addFriend.id
    );

    if (index !== -1) {
      const updatedUsers = [...prev];
      updatedUsers[index] = {
        ...prev[index],
        isFriend: true,
      };

      return updatedUsers;
    }
  })
  .on(removeContactFx.doneData, (prev, response) => {
    const index = prev.findIndex(
      (user) => user.id === response.data?.removeFriend
    );

    if (index !== -1) {
      const updatedUsers = [...prev];
      updatedUsers[index] = {
        ...prev[index],
        isFriend: false,
      };

      return updatedUsers;
    }
  });
$usersLoading.on(fetchUsersFx.pending, (_, payload) => payload);

$usersError.on(fetchUsersFx.failData, (_, err) => err);
