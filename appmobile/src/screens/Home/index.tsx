import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import * as S from "./styles";
import HomeAdmin from "../../components/HomeAdmin";
import HomeManager from "../../components/HomeManager";
import HomeUser from "../../components/HomeUser";
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
      content = <HomeAdmin />;
    } else if (user?.type === "Manager") {
      content = <HomeManager />;
    } else if (user?.type === "User") {
      content = <HomeUser />;
    }
    return <S.Container>{content}</S.Container>;
  };
  return <Card />;
}
