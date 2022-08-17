import {
  ApolloClient,
  createHttpLink,
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
    url: "ws://localhost:4000/graphql",
    shouldRetry(errOrCloseEvent) {
      return true;
    },
    connectionParams: async () => {
      const userToken = await AsyncStorage.getItem(AsyncStorageKey.USER_TOKEN);
      return {
        isWebSocket: true,
        authorization: "Bearer " + userToken,
      };
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
        AsyncStorage.setItem(AsyncStorageKey.USER_TOKEN, "").then(() => {});
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
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink).concat(link),
});
