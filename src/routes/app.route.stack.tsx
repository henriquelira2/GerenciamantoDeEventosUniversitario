import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Teste } from "../screens/Teste";

type AuthRoutes = {
  Teste: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AppRouteStack() {
  return (
    <Navigator initialRouteName="Teste">
      <Screen
        name="Teste"
        component={Teste}
        options={{
          headerTransparent: true,
        }}
      />

      <Screen
        name="Login"
        component={Login}
        options={{
          headerTransparent: true,
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          headerTransparent: true,
        }}
      />
    </Navigator>
  );
}