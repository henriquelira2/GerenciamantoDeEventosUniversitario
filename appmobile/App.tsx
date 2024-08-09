import * as NavigationBar from "expo-navigation-bar";
import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import { StatusBar, AppRegistry } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components/native";

import { Routes } from "./src/routes/index";
import theme from "./src/theme";

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error("Error fetching latest Expo update:", error);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  const queryClient = new QueryClient();
  AppRegistry.registerComponent("main", () => App);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
