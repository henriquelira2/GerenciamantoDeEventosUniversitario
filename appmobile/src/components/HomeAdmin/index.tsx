import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { HomeIconList } from "../../components/HomeAdmItens";
import { homeAdm, homeAdmList } from "../../data/homeAdm";

export default function HomeAdmin({
  lastName,
  firstName,
}: {
  lastName?: string;
  firstName?: string;
}) {
  const navigation = useNavigation();
  const numColumns = 3;

  const formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  function renderItem({ item }: ListRenderItemInfo<homeAdm>) {
    if (item.empty) {
      return (
        <View style={{ flex: 1, margin: 5, backgroundColor: "transparent" }} />
      );
    }
    return <HomeIconList {...item} />;
  }

  return (
    <S.Container>
      <ImageBackground source={bacground} style={{ flex: 1 }}>
        <S.Top>
          <S.ImageTop
            source={require("../../assets/Logo.png")}
            style={{
              resizeMode: "contain",
            }}
          />
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.openDrawer()}
            style={{ position: "absolute", left: 20, top: 20 }}
          >
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </S.Top>

        <FlatList
          data={formatData(homeAdmList, numColumns)}
          keyExtractor={(item) => item.name || item.key}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ImageBackground>
    </S.Container>
  );
}
