import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Events } from "../screens/Events";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";

type AppRoutes = {
  Home: undefined;
  Events: undefined;
  Profile: undefined;
};

export type AppBotoomTabsRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function BottomTabs() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#171626",
          borderTopWidth: 0,

          bottom: 14,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 5,
          height: 60,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={color} />;
            }
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="Events"
        component={Events}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <MaterialIcons name="event" size={size} color={color} />;
            }
            return (
              <MaterialIcons name="event-note" size={size} color={color} />
            );
          },
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="face-man"
                  size={size}
                  color={color}
                />
              );
            }
            return (
              <MaterialCommunityIcons
                name="face-man-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}
