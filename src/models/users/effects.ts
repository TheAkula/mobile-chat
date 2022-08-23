import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import { UsersQuery, UsersDocument } from "src/generated/graphql";

export const fetchUsersFx = createEffect(() => {
  return apolloClient.query<UsersQuery>({
    query: UsersDocument,
  });
});

export const useFetchUsers = () => useUnit(fetchUsersFx);
