import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

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

const { Navigator: TabNavigator, Screen: TabScreen } =
  createBottomTabNavigator<AppRoutes>();

export function BottomTabs() {
  return (
    <TabNavigator
      initialRouteName="Home"
      screenOptions={{
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
      }}
    >
      <TabScreen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabScreen
        name="Eventos"
        component={Events}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "event" : "event-note"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabScreen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
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
