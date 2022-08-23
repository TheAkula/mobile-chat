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
import { Routes } from "src/navigation";
import styled from "styled-components/native";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "src/api";
import "src/models/init";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppTheme.colors.blue[7],
  },
};

export default function App() {
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
        <NavigationContainer theme={navTheme}>
          <AppContainer>
            <Routes />
          </AppContainer>
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const AppContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.blue[7]};
  flex: 1;
`;
