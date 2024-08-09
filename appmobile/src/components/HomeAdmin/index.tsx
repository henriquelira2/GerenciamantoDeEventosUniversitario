import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import * as S from "./styles";
import { HomeIconList } from "../../components/HomeAdmItens";
import { homeAdm, homeAdmList } from "../../data/homeAdm";

export default function HomeAdmin() {
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
      <S.Top>
        <S.ImageTop
          source={require("../../assets/extensao-marca-gomos-cor.png")}
          style={{
            resizeMode: "contain",
          }}
        />
      </S.Top>
      <S.Bot>
        <FlatList
          data={formatData(homeAdmList, numColumns)}
          stickyHeaderIndices={[0]}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </S.Bot>
    </S.Container>
  );
}
