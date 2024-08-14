import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import { useIcon } from "../contexts/IconContext"; // Importe o contexto
import { CreateUser } from "../screens/CreateUser";
import { Events } from "../screens/Events";
import { Home } from "../screens/Home";
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
          const routeName = e.data.state.routeNames[e.data.state.index];
          setSelectedItem(routeName);
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
        options={{ headerShown: false }}
      />
      <TabScreen
        name="Perfil"
        component={Profile}
        options={{ headerShown: false }}
      />

      <TabScreen
        name="UserList"
        component={UserList}
        options={{
          tabBarButton: () => null,
          headerStyle: {
            backgroundColor: `${theme.COLORS.RED}`,
            height: 150,
            borderBottomEndRadius: 50,
          },
          headerTitle: "                 Usuarios Cadastrados",
          headerTintColor: `${theme.COLORS.WHITE}`,
        }}
      />
      <TabScreen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          tabBarButton: () => null,
          headerStyle: {
            backgroundColor: `${theme.COLORS.RED}`,
            height: 120,
          },
          headerTitle: "                EDITAR PERFIL",
          headerTintColor: `${theme.COLORS.WHITE}`,
        }}
      />
      <TabScreen
        name="CreateUser"
        component={CreateUser}
        options={{
          tabBarButton: () => null,
          headerStyle: {
            backgroundColor: `${theme.COLORS.RED}`,
            height: 120,
          },
          headerTitle: "                Criar Novo Usuario",
          headerTintColor: `${theme.COLORS.WHITE}`,
        }}
      />
    </TabNavigator>
  );
}
