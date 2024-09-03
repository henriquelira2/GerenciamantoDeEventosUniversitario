import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";

import * as S from "./styles";
import { useIcon } from "../../contexts/IconContext";
import { AuthContext } from "../../contexts/auth";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";

export function DrawerRoutes(props: any) {
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const { selectedItem, setSelectedItem } = useIcon();

  const handleItemPress = (routeName: string) => {
    setSelectedItem(routeName);
    navigation.navigate(routeName);
  };

  const getItemStyle = (routeName: string) => ({
    backgroundColor: selectedItem === routeName ? "#171626" : "transparent",
  });
  const { setUser } = useContext(AuthContext);

  const getIconSource = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return selectedItem === "Home"
          ? require("../../assets/drawerIcons/home-icon-w.png")
          : require("../../assets/drawerIcons/home-icon.png");
      case "Eventos":
        return selectedItem === "Eventos"
          ? require("../../assets/drawerIcons/event-icon-w.png")
          : require("../../assets/drawerIcons/event-icon.png");
      case "Perfil":
        return selectedItem === "Perfil"
          ? require("../../assets/drawerIcons/user-icon-w.png")
          : require("../../assets/drawerIcons/user-icon.png");
      case "UserList":
        return selectedItem === "UserList"
          ? require("../../assets/drawerIcons/listuser-icon-w.png")
          : require("../../assets/drawerIcons/listuser-icon.png");
      case "UpdateProfile":
        return selectedItem === "UpdateProfile"
          ? require("../../assets/drawerIcons/edituser-icon-w.png")
          : require("../../assets/drawerIcons/edituser-icon.png");
      case "CreateUser":
        return selectedItem === "CreateUser"
          ? require("../../assets/drawerIcons/newuser-icon-w.png")
          : require("../../assets/drawerIcons/newuser-icon.png");
      case "CreateEvent":
        return selectedItem === "CreateEvent"
          ? require("../../assets/drawerIcons/event-icon-w.png")
          : require("../../assets/drawerIcons/event-icon.png");
      case "Logout":
        return selectedItem === "Logout"
          ? require("../../assets/drawerIcons/sairuser-icon.png")
          : require("../../assets/drawerIcons/sairuser-icon.png");

      default:
        return require("../../assets/drawerIcons/listuser-icon.png");
    }
  };

  return (
    <S.Container style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#ffffff44" }}
      >
        <S.Top style={{ padding: 20, resizeMode: "cover" }}>
          <S.LogoTop
            style={{ resizeMode: "stretch" }}
            source={require("../../assets/layout_set_logo.png")}
          />
        </S.Top>

        <S.Middle>
          <DrawerItem
            label="Home"
            onPress={() => handleItemPress("Home")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("Home")}
              />
            )}
            style={getItemStyle("Home")}
            labelStyle={{
              color: selectedItem === "Home" ? "white" : "black",
            }}
          />
          <DrawerItem
            label="Eventos"
            onPress={() => handleItemPress("Eventos")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("Eventos")}
              />
            )}
            style={getItemStyle("Eventos")}
            labelStyle={{
              color: selectedItem === "Eventos" ? "white" : "black",
            }}
          />

          <DrawerItem
            label="Perfil"
            onPress={() => handleItemPress("Perfil")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("Perfil")}
              />
            )}
            style={getItemStyle("Perfil")}
            labelStyle={{
              color: selectedItem === "Perfil" ? "white" : "black",
            }}
          />

          <DrawerItem
            label="Lista de Usuarios"
            onPress={() => handleItemPress("UserList")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("UserList")}
              />
            )}
            style={getItemStyle("UserList")}
            labelStyle={{
              color: selectedItem === "UserList" ? "white" : "black",
            }}
          />

          <DrawerItem
            label="Editar Perfil"
            onPress={() => handleItemPress("UpdateProfile")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("UpdateProfile")}
              />
            )}
            style={getItemStyle("UpdateProfile")}
            labelStyle={{
              color: selectedItem === "UpdateProfile" ? "white" : "black",
            }}
          />

          <DrawerItem
            label="Criar Novo Usuario"
            onPress={() => handleItemPress("CreateUser")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("CreateUser")}
              />
            )}
            style={getItemStyle("CreateUser")}
            labelStyle={{
              color: selectedItem === "CreateUser" ? "white" : "black",
            }}
          />
          <DrawerItem
            label="Criar Evento"
            onPress={() => handleItemPress("CreateEvent")}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("CreateEvent")}
              />
            )}
            style={getItemStyle("CreateEvent")}
            labelStyle={{
              color: selectedItem === "CreateEvent" ? "white" : "black",
            }}
          />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await AsyncStorage.clear();
              setUser(false);
              console.log("AsyncStorage limpo com sucesso!");
            }}
            icon={() => (
              <S.Icon
                style={{ resizeMode: "stretch" }}
                source={getIconSource("Logout")}
              />
            )}
            style={getItemStyle("Logout")}
            labelStyle={{
              color: selectedItem === "CreateEvent" ? "white" : "black",
            }}
          />

          <DrawerItemList {...props} />
        </S.Middle>
      </DrawerContentScrollView>

      <S.Bottom>
        <S.ButtomBottom onPress={() => {}}>
          <S.BottomBox>
            <Ionicons name="information-circle-outline" size={22} />
            <S.BottomText>Sobre o App</S.BottomText>
          </S.BottomBox>
        </S.ButtomBottom>
      </S.Bottom>
    </S.Container>
  );
}
