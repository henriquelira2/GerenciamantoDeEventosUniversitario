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
import { HomeUserItens } from "../../components/HomeUserItens";
import { homeUser, homeUserList } from "../../data/homeUser";

export default function HomeUser({
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

  function renderItem({ item, index }: ListRenderItemInfo<homeUser>) {

    if (item.empty) {
      return (
        <View style={{ flex: 1, margin: 2, backgroundColor: "transparent" }} />
      );
    }

    const itemStyle =
      item.name === "Eventos" ? { width: "100%" } : { flex: 1, margin: 2 };

    return (
      //@ts-ignore
      <View style={itemStyle}>
        <HomeUserItens {...item} />
      </View>
    );
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
          data={formatData(homeUserList, numColumns)}
          keyExtractor={(item) => item.name || item.key}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ImageBackground>
    </S.Container>
  );
}
