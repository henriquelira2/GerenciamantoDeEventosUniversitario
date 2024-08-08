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
            icon={({ color, size }) => (
              <Ionicons
                name="home"
                size={20}
                color={selectedItem === "Home" ? "white" : "black"}
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
            icon={({ color, size }) => (
              <Ionicons
                name="paper-plane"
                size={20}
                color={selectedItem === "Eventos" ? "white" : "black"}
              />
            )}
            style={getItemStyle("Eventos")}
            labelStyle={{
              color: selectedItem === "Eventos" ? "white" : "black",
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
