import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import { useIcon } from "../contexts/IconContext";
import { CreateEvent } from "../screens/CreateEvent";
import { CreateUser } from "../screens/CreateUser";
import { EventDetails } from "../screens/EventDetails";
import { EventDetailsMaster } from "../screens/EventDetailsMaster";
import { Events } from "../screens/Events";
import { Home } from "../screens/Home";
import { MyCreatedEvents } from "../screens/MyCreatedEvents";
import { MyEvents } from "../screens/MyEvents";
import { Profile } from "../screens/Profile";
import { UpdateProfile } from "../screens/UpdateProfile";
import { UserList } from "../screens/UsersList";
import theme from "../theme";

type AppRoutes = {
  Home: undefined;
  Eventos: undefined;
  Perfil: undefined;
  UserList: undefined;
  UpdateProfile: undefined;
  CreateUser: undefined;
  CreateEvent: undefined;
  EventDetails: undefined;
  Payment: undefined;
  MyEvents: undefined;
  MyCreatedEvents: undefined;
  EventDetailsMaster: undefined;
};

export type AppBottomTabsRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function BottomTabs() {
  const { selectedItem, setSelectedItem } = useIcon();
  const { Navigator: TabNavigator, Screen: TabScreen } =
    createBottomTabNavigator<AppRoutes>();

  const getIconSource = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return selectedItem === "Home"
          ? require("../assets/drawerIcons/home-icon-w.png")
          : require("../assets/drawerIcons/home-icon.png");
      case "Eventos":
        return selectedItem === "Eventos"
          ? require("../assets/drawerIcons/event-icon-w.png")
          : require("../assets/drawerIcons/event-icon.png");
      case "Perfil":
        return selectedItem === "Perfil"
          ? require("../assets/drawerIcons/user-icon-w.png")
          : require("../assets/drawerIcons/user-icon.png");
      case "MyEvents":
        return selectedItem === "MyEvents"
          ? require("../assets/drawerIcons/user-icon-w.png")
          : require("../assets/drawerIcons/user-icon.png");
      default:
        return require("../assets/drawerIcons/listuser-icon.png");
    }
  };

  return (
    <TabNavigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icon = getIconSource(route.name);
          return (
            <Image
              source={icon}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#171626",
          borderTopWidth: 0,
          paddingBottom: 5,
          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 5,
          height: 60,
          zIndex: 1,
        },
      })}
      screenListeners={{
        state: (e) => {
          if (e.data && "state" in e.data) {
            const state = e.data.state as {
              routeNames: string[];
              index: number;
            };
            const routeName = state.routeNames[state.index];
            setSelectedItem(routeName);
          }
        },
      }}
    >
      <TabScreen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <TabScreen
        name="Eventos"
        component={Events}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 80,
          },
          headerTitle: "Eventos",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="Perfil"
        component={Profile}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 120,
          },
          headerTitle: "PERFIL",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />

      <TabScreen
        name="UserList"
        component={UserList}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 120,
          },
          headerTitle: "Usuarios Cadastrados",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 120,
          },
          headerTitle: "Editar Perfil",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="CreateUser"
        component={CreateUser}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 120,
          },
          headerTitle: "Criar Novo Usuario",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="CreateEvent"
        component={CreateEvent}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 120,
          },
          headerTitle: "Criar Novo Evento",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="EventDetails"
        component={EventDetails}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerTitle: " ",
          tabBarStyle: { display: "none" },
          headerLeft: () => null,
        }}
      />
      <TabScreen
        name="EventDetailsMaster"
        component={EventDetailsMaster}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerTitle: " ",
          tabBarStyle: { display: "none" },
          headerLeft: () => null,
        }}
      />
      <TabScreen
        name="MyEvents"
        component={MyEvents}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 80,
          },
          headerTitle: "Meus Eventos Cadastrados",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
      <TabScreen
        name="MyCreatedEvents"
        component={MyCreatedEvents}
        options={{
          tabBarButton: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
            height: 100,
          },
          headerTitle: "Meus Eventos Criados",
          headerTintColor: theme.COLORS.WHITE,
        }}
      />
    </TabNavigator>
  );
}
