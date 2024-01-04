import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import * as S from "./styles";
import { useGetUser } from "../../configs/hooks";
import theme from "../../theme";
export function Profile() {
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

  const { data: user, refetch: userRefetch } = useGetUser({
    cpf: userCpf || "",
  });
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      return () => {};
    }, []),
  );

  return (
    <S.Container>
      <S.Top>
        <S.BoxTextTop>
          <S.NameText numberOfLines={1}>
            {user?.firstName} &nbsp;
            {user?.lastName}
          </S.NameText>
          <S.EmailText numberOfLines={1}>{user?.email}</S.EmailText>
        </S.BoxTextTop>
        <S.Avatar
          style={{
            resizeMode: "center",
          }}
          source={{
            uri: `https://api.multiavatar.com/Binx%20${user?.firstName}.png`,
          }}
        />
      </S.Top>
      <S.Bot>
        <S.BoxBot>
          <S.Icon style={{ elevation: 5 }}>
            <AntDesign name="idcard" size={30} color={theme.COLORS.BLUE100} />
          </S.Icon>

          <S.BoxTextBot>
            <S.TextInfo>CPF :</S.TextInfo>
            <S.TextBot>{user?.cpf}</S.TextBot>
          </S.BoxTextBot>
        </S.BoxBot>

        <S.BoxBot>
          <S.Icon style={{ elevation: 5 }}>
            <MaterialCommunityIcons
              name="cellphone-text"
              size={30}
              color={theme.COLORS.GREEN100}
            />
          </S.Icon>

          <S.BoxTextBot>
            <S.TextInfo>NUMERO :</S.TextInfo>
            <S.TextBot>{user?.phoneNumber}</S.TextBot>
          </S.BoxTextBot>
        </S.BoxBot>

        <S.BoxBot>
          <S.Icon style={{ elevation: 5 }}>
            <Feather name="type" size={30} color={theme.COLORS.PINK} />
          </S.Icon>

          <S.BoxTextBot>
            <S.TextInfo>TIPO DE USUARIO :</S.TextInfo>
            <S.TextBot>{user?.type}</S.TextBot>
          </S.BoxTextBot>
        </S.BoxBot>
      </S.Bot>
    </S.Container>
  );
}
