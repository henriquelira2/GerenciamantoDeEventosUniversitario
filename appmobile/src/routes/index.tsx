import { NavigationContainer } from "@react-navigation/native";

import { AppRouteStack } from "./app.route.stack";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRouteStack />
    </NavigationContainer>
  );
}
