import { StripeProvider } from "@stripe/stripe-react-native";
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
    //  onFetchUpdateAsync();
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  const queryClient = new QueryClient();
  AppRegistry.registerComponent("main", () => App);
  return (
    <StripeProvider
      publishableKey="pk_test_51Pw0KaRt8T5dTSSCLStGKjsZb2iKW6DYu1Bz0t0dolZ1GQIavknyFQYKjTWfDg8jpF8AcGPIq9JnNzGqTO7UpLlY00V1rjx6Il"
      merchantIdentifier="merchant.com.{{eventmanager}}"
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}
