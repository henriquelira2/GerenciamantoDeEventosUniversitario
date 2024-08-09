import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import * as S from "./styles";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";

export function DrawerRoutes(props: any) {
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemPress = (routeName: string) => {
    setSelectedItem(routeName);
    navigation.navigate(routeName);
  };

  const getItemStyle = (routeName: string) => ({
    backgroundColor: selectedItem === routeName ? "#171626" : "transparent",
  });

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
          : require("../../assets/drawerIcons/user-icon.png")
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

          <DrawerItemList {...props} />
        </S.Middle>
      </DrawerContentScrollView>

      <S.Bottom>
        <S.ButtomBottom onPress={() => { }}>
          <S.BottomBox>
            <Ionicons name="information-circle-outline" size={22} />
            <S.BottomText>Sobre o App</S.BottomText>
          </S.BottomBox>
        </S.ButtomBottom>
      </S.Bottom>
    </S.Container>
  );
}
