import { createEffect } from "effector";
import { useUnit } from "effector-react";
import { apolloClient } from "src/api";
import {
  UsersQuery,
  UsersDocument,
  UsersQueryVariables,
  UserActivityChangedSubscription,
  UserActivityChangedDocument,
} from "src/generated/graphql";
import { changeActivity } from "./events";

export const fetchUsersFx = createEffect((variables?: UsersQueryVariables) => {
  return apolloClient.query<UsersQuery>({
    query: UsersDocument,
    variables,
  });
});

export const fetchMoreUsersFx = createEffect(
  (variables?: UsersQueryVariables) => {
    return apolloClient
      .watchQuery<UsersQuery>({
        query: UsersDocument,
      })
      .fetchMore<UsersQuery>({
        variables,
      });
  }
);

export const userActivityChangedSubscribeFx = createEffect(() => {
  return apolloClient
    .subscribe<UserActivityChangedSubscription>({
      query: UserActivityChangedDocument,
    })
    .subscribe({
      next(value) {
        if (value.data) {
          changeActivity(value.data.userActivityChanged);
        }
      },
    });
});

export const useFetchUsers = () => useUnit(fetchUsersFx);
export const useFetchMoreUsers = () => useUnit(fetchMoreUsersFx);
export const useUserActivityChangedSubscribe = () =>
  useUnit(userActivityChangedSubscribeFx);
