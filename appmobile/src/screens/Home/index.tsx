import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import * as S from "./styles";
import { useGetUser } from "../../configs/hooks";

export function Home() {
  const [userCpf, setUserCpf] = useState<string | null>(null);

  const onRefresh = () => {
    const loadUser = async () => {
      const useGetUser = await AsyncStorage.getItem("userCPF");
      setUserCpf(useGetUser);
    };
    setTimeout(() => {
      userRefetch();
      loadUser();
    }, 100);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const { data: user, refetch: userRefetch } = useGetUser({ cpf: userCpf });
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      return () => {};
    }, []),
  );

  const Card = () => {
    let content;

    if (user?.type === "Admin") {
      content = (
        <S.TextButtom style={{ fontSize: 24, color: "red" }}>
          {user?.type}
        </S.TextButtom>
      );
    } else if (user?.type === "Manager") {
      content = (
        <S.TextButtom style={{ fontSize: 24, color: "white" }}>
          {user?.type}
        </S.TextButtom>
      );
    } else if (user?.type === "User") {
      content = (
        <S.TextButtom style={{ fontSize: 24, color: "yellow" }}>
          {user?.type}
        </S.TextButtom>
      );
    }
    return <S.Container style={{ padding: 24 }}>{content}</S.Container>;
  };
  return (
    <S.Container>
      <Card />
    </S.Container>
  );
}
