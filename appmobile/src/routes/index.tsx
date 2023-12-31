import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import { BottomTabs } from "./app.route.bottomTabs";
import { AppRouteStack } from "./app.route.stack";
import { AuthContext } from "../contexts/auth";

export function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        setUser: (user) => {
          setLoggedIn(user);
        },
      }}
    >
      <NavigationContainer>
        {loggedIn ? <BottomTabs /> : <AppRouteStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
