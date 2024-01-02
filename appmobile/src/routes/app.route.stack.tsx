import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { ResetPassoword } from "../screens/ResetPassoword";
import { SendPassoword } from "../screens/SendPassoword";
import { Teste } from "../screens/Teste";

type AuthRoutes = {
  Teste: undefined;
  Login: undefined;
  Register: undefined;
  SendPassoword: undefined;
  ResetPassoword: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AppRouteStack() {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Teste"
        component={Teste}
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <Screen
        name="Login"
        component={Login}
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />

      <Screen
        name="SendPassoword"
        component={SendPassoword}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Screen
        name="ResetPassoword"
        component={ResetPassoword}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
          animation: "slide_from_bottom",
        }}
      />
    </Navigator>
  );
}
