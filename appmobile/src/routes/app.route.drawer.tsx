/* eslint-disable prettier/prettier */
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";

import { BottomTabs } from "./app.route.bottomTabs";
import { DrawerRoutes } from "../components/DrawerRouteBar";
import theme from "../theme";

type AppRoutesDrawer = {
  BottomTabs: undefined;
};

type RouteDrawerProps = {
  tabState: any;
};

const Drawer = createDrawerNavigator<AppRoutesDrawer>();

const CustomDrawerContent = (
  props: DrawerContentComponentProps & RouteDrawerProps
) => {
  const { state, ...rest } = props;
  const [currentRouteName, setCurrentRouteName] = useState("");

  useEffect(() => {
    if (state && state.routes) {
      setCurrentRouteName(state.routes[state.index].name);
    } else if (props.tabState && props.tabState.routes) {
      setCurrentRouteName(props.tabState.routes[props.tabState.index].name);
    }
  }, [state, props.tabState]);

  return (
    <DrawerContentScrollView {...rest}>
      <DrawerRoutes {...rest} currentRouteName={currentRouteName} />
    </DrawerContentScrollView>
  );
};

export function RouteDrawer({ tabState }: RouteDrawerProps) {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={({ route }) => ({
        drawerStyle: {
          backgroundColor: theme.COLORS.WHITE,
          zIndex: 999,
        },
        headerTintColor: theme.COLORS.WHITE,
        drawerLabel: () => null,
        headerLeft: route.name === "BottomTabs" ? undefined : () => null,
      })}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} tabState={tabState} />
      )}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
