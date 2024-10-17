/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground } from "react-native";

import * as S from "./styles";
import { homeAdm } from "../../data/homeAdm";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";

export function HomeUserItens({ name, background, route }: homeAdm) {
  const navigation = useNavigation<AppBottomTabsRoutesProps>();

  const Routes = () => {
    //@ts-ignore
    navigation.navigate(route);
  };

  return (
    <S.Container
      elevation={1}
      style={{
        backgroundColor: "#d9d9d9",
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        borderRadius: 5,
      }}
    >
      <S.Box key={name} onPress={() => Routes()}>
        <ImageBackground
          source={background}
          imageStyle={{ borderRadius: 5 }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <S.Info> {name}</S.Info>
        </ImageBackground>
      </S.Box>
    </S.Container>
  );
}
