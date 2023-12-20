import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";

import * as S from "./styles";
import { AuthContext } from "../../contexts/auth";
export function Profile() {
  const { setUser } = useContext(AuthContext);

  const Logout = async () => {
    await AsyncStorage.clear();
    setUser(false);
  };

  return (
    <S.Container>
      <S.TextButtom>Profile</S.TextButtom>
      <S.Button
        onPress={() => {
          Logout();
        }}
      >
        <S.TextButton>logout</S.TextButton>
      </S.Button>
    </S.Container>
  );
}
