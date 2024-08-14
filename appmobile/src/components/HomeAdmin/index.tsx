import React from "react";
import { FlatList, ListRenderItemInfo, ImageBackground } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela2.png";
import { HomeIconList } from "../../components/HomeAdmItens";
import { homeAdm, homeAdmList } from "../../data/homeAdm";

export default function HomeAdmin({
  lastName,
  firstName,
}: {
  lastName?: string;
  firstName?: string;
}) {
  const numColumns = 3;

  const formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: false });
      numberOfElementsLastRow++;
    }
    return data;
  };

  function renderItem({ item }: ListRenderItemInfo<homeAdm>) {
    return <HomeIconList {...item} />;
  }

  return (
    <S.Container>
      <ImageBackground source={bacground} style={{ flex: 1 }}>
        <S.Top>
          <S.ImageTop
            source={require("../../assets/extensao-marca-gomos-cor.png")}
            style={{
              resizeMode: "contain",
            }}
          />
        </S.Top>

        <FlatList
          data={formatData(homeAdmList, numColumns)}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ImageBackground>
    </S.Container>
  );
}
