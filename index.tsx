import { Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { AppTheme } from "src/theme";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
  Mulish_600SemiBold,
} from "@expo-google-fonts/mulish";
import styled from "styled-components/native";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "src/api";
import { CurrentChatContextProvider } from "src/context";
import { App } from "./app";
import { registerRootComponent } from "expo";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppTheme.colors.blue[7],
  },
};

function Application() {
  const [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
    Mulish_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Load fonts</Text>
      </View>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={AppTheme}>
        <CurrentChatContextProvider>
          <NavigationContainer theme={navTheme}>
            <App />
          </NavigationContainer>
        </CurrentChatContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default registerRootComponent(Application);
