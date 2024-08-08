/* eslint-disable prettier/prettier */
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";


import { DrawerRoutes } from "../components/DrawerRouteBar";
import { BottomTabs } from "../routes/app.route.bottomTabs";
import theme from "../theme";

type AppRoutesDrawer = {
  BottomTabs: undefined;
};

type RouteDrawerProps = {
  tabState: any;
};

const Drawer = createDrawerNavigator<AppRoutesDrawer>();

export function RouteDrawer({ tabState }: RouteDrawerProps) {
  const [currentRouteName, setCurrentRouteName] = useState("");

  useEffect(() => {
    if (tabState) {
      setCurrentRouteName(tabState.routes[tabState.index].name);
    }
  }, [tabState]);

  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.COLORS.WHITE,
          zIndex: 999,
        },
        headerTintColor: theme.COLORS.WHITE,
        drawerLabel: () => null,
      }}
      drawerContent={(props) => (
        <DrawerRoutes
          {...props}
          tabState={tabState}
          currentRouteName={currentRouteName}
        />
      )}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          title: "",
          headerTransparent: true,
          drawerItemStyle: { backgroundColor: "transparent" },
        }}
      />
    </Drawer.Navigator>
  );
}
