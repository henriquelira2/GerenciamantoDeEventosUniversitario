import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useGetUser } from "../../configs/hooks";
import { useIcon } from "../../contexts/IconContext";
import { AuthContext } from "../../contexts/auth";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
export function DrawerRoutes(props: any) {
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const { selectedItem, setSelectedItem } = useIcon();
  const { setUser } = useContext(AuthContext);

  const [userType, setUserType] = useState<string | null>(null);

  const onRefresh = () => {
    const loadUser = async () => {
      const useGetUser = await AsyncStorage.getItem("userCPF");
      setUserType(useGetUser);
    };
    setTimeout(() => {
      userRefetch();
      loadUser();
    }, 100);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const { data: user, refetch: userRefetch } = useGetUser({
    cpf: userType || "",
  });

  const handleItemPress = (routeName: string) => {
    setSelectedItem(routeName);
    //@ts-ignore
    navigation.navigate(routeName);
  };

  const getItemStyle = (routeName: string) => ({
    backgroundColor: selectedItem === routeName ? "#6a6a6faa" : "transparent",
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
          : require("../../assets/drawerIcons/user-icon.png");
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
          ? require("../../assets/drawerIcons/createvent-icon-w.png")
          : require("../../assets/drawerIcons/createvent-icon.png");
      case "MyEvents":
        return selectedItem === "MyEvents"
          ? require("../../assets/drawerIcons/resgisterevent-icon-w.png")
          : require("../../assets/drawerIcons/resgisterevent-icon.png");
      case "MyCreatedEvents":
        return selectedItem === "MyCreatedEvents"
          ? require("../../assets/drawerIcons/createdevent-icon-w.png")
          : require("../../assets/drawerIcons/createdevent-icon.png");
      case "Logout":
        return selectedItem === "Logout"
          ? require("../../assets/drawerIcons/sairuser-icon.png")
          : require("../../assets/drawerIcons/sairuser-icon.png");
      default:
        return require("../../assets/drawerIcons/listuser-icon.png");
    }
  };

  return (
    <ImageBackground source={bacground} style={{ flex: 1, bottom: 30 }}>
      <S.Container style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <S.Top>
            <S.LogoTop
              style={{ resizeMode: "stretch" }}
              source={require("../../assets/Logo.png")}
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
            {user?.type === "Admin" && (
              <>
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
                  label="Meus Eventos cadastrados"
                  onPress={() => handleItemPress("MyEvents")}
                  icon={() => (
                    <S.Icon
                      style={{ resizeMode: "stretch" }}
                      source={getIconSource("MyEvents")}
                    />
                  )}
                  style={getItemStyle("MyEvents")}
                  labelStyle={{
                    color: selectedItem === "MyEvents" ? "white" : "black",
                  }}
                />
                <DrawerItem
                  label="Meus Eventos Criados"
                  onPress={() => handleItemPress("MyCreatedEvents")}
                  icon={() => (
                    <S.Icon
                      style={{ resizeMode: "stretch" }}
                      source={getIconSource("MyCreatedEvents")}
                    />
                  )}
                  style={getItemStyle("MyCreatedEvents")}
                  labelStyle={{
                    color:
                      selectedItem === "MyCreatedEvents" ? "white" : "black",
                  }}
                />
              </>
            )}

            {user?.type === "Manager" && (
              <>
                <DrawerItem
                  label="Meus Eventos Criados"
                  onPress={() => handleItemPress("MyCreatedEvents")}
                  icon={() => (
                    <S.Icon
                      style={{ resizeMode: "stretch" }}
                      source={getIconSource("MyCreatedEvents")}
                    />
                  )}
                  style={getItemStyle("MyCreatedEvents")}
                  labelStyle={{
                    color:
                      selectedItem === "MyCreatedEvents" ? "white" : "black",
                  }}
                />
              </>
            )}

            {user?.type === "User" && (
              <>
                <DrawerItem
                  label="Meus Eventos cadastrados"
                  onPress={() => handleItemPress("MyEvents")}
                  icon={() => (
                    <S.Icon
                      style={{ resizeMode: "stretch" }}
                      source={getIconSource("MyEvents")}
                    />
                  )}
                  style={getItemStyle("MyEvents")}
                  labelStyle={{
                    color: selectedItem === "MyEvents" ? "white" : "black",
                  }}
                />
              </>
            )}
          </S.Middle>
        </DrawerContentScrollView>

        <S.Bottom>
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
              color: selectedItem === "Logout" ? "white" : "black",
            }}
          />
        </S.Bottom>
      </S.Container>
    </ImageBackground>
  );
}
