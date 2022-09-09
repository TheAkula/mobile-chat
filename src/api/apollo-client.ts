import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "graphql-ws";
import { AsyncStorageKey } from "src/constants";

const httpLink = createHttpLink({
  uri: "http://192.168.1.247:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://192.168.1.247:4000/graphql",
    shouldRetry(errOrCloseEvent) {
      return true;
    },

    connectionParams: async () => {
      const userToken = await AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN);

      const params = {
        isWebSocket: true,
        authorization: "Bearer " + userToken,
      };

      return params;
    },
  })
);

const authLink = setContext(async (_, { headers }) => {
  const userToken = await AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${userToken}`,
    },
  };
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((graphqlError) => {
      if (graphqlError.message === "Unauthorized") {
        AsyncStorage.setItem(AsyncStorageKey.USER_TOKEN, "");
      }
    });
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Message: {
        fields: {
          usersSeen: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Subscription: {
        fields: {
          messageUpdated: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      User: {
        fields: {
          friends: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Chat: {
        fields: {
          users: {
            merge(_, incoming) {
              return incoming;
            },
          },
          messages: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Query: {
        fields: {
          messages: {
            keyArgs: ["filter", "id"],

            merge(existing = { data: [], nextPage: 0 }, incoming) {
              return {
                ...existing,
                ...incoming,
              };
            },
          },
          users: {
            keyArgs: ["filter"],

            merge(existing = { data: [], nextPage: 0 }, incoming) {
              return {
                ...existing,
                data: [...existing.data, ...incoming.data],
                nextPage: incoming.nextPage,
              };
            },
          },
          myChats: {
            merge(_, incoming) {
              return incoming;
            },
          },
          myFriends: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: from([authLink, errorLink, link]),
});
