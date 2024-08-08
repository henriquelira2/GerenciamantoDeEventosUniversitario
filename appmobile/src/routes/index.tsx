import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import { RouteDrawer } from "./app.route.drawer";
import { AppRouteStack } from "./app.route.stack";
import { AuthContext } from "../contexts/auth";

export function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tabState, setTabState] = useState<any>(null);
  return (
    <AuthContext.Provider
      value={{
        setUser: (user) => {
          setLoggedIn(user);
        },
      }}
    >
      <NavigationContainer onStateChange={(state) => setTabState(state)}>
        {loggedIn ? <RouteDrawer tabState={tabState} /> : <AppRouteStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
