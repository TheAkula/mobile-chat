import {
  $users,
  fetchUsersFx,
  $usersLoading,
  $usersError,
  removeUser,
} from ".";

$users
  .on(fetchUsersFx.doneData, (_, data) => data.data.users)
  .on(removeUser, (prev, payload) =>
    // prev.filter((user) => user.id !== payload)
    [{ id: "1", lastName: "str", firstName: "some" }]
  );

$usersLoading.on(fetchUsersFx.pending, (payload) => payload);

$usersError.on(fetchUsersFx.failData, (_, err) => err);

// $users.watch((payload) => console.log(payload));
