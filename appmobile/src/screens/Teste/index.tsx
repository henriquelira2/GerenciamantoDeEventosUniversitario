import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Axios } from "axios";
import { useEffect, useState } from "react";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";

export function Teste() {
  const [date, setDate] = useState("");
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("Login");
  }
  const GetUser = async () => {
    const response = await api.get(`/users/71189112345`);
    setDate(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <S.Container>
      <S.TextButtom>{date.cpf}</S.TextButtom>
      <S.TextButtom>{date.firstName}</S.TextButtom>
      <S.TextButtom>{date.lastName}</S.TextButtom>
      <S.TextButtom>{date.phoneNumber}</S.TextButtom>
      <S.TextButtom>{date.email}</S.TextButtom>
      <S.TextButtom>{date.type}</S.TextButtom>
      <S.TextButtom>{date.password}</S.TextButtom>
    </S.Container>
  );
}
