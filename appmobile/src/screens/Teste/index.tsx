import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";

export function Teste() {
  return (
    <S.Container>
      <S.TextButtom>Logado</S.TextButtom>
    </S.Container>
  );
}
