import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useGetUser } from "../../configs/hooks";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import theme from "../../theme";

export function Profile() {
  const [userCpf, setUserCpf] = useState<string | null>(null);

  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  function updateNavigation() {
    navigation.navigate("UpdateProfile");
  }

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
    <S.Container source={bacground}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <S.Avatar
            style={{
              resizeMode: "center",
            }}
            elevation={5}
            source={{
              uri: `https://api.multiavatar.com/${user?.firstName}${user?.lastName}.png?apikey=cbQkPid1zIYhJR`,
            }}
          />

          <S.BoxBot>
            <S.Icon>
              <AntDesign name="user" size={30} color={theme.COLORS.WHITE} />
            </S.Icon>

            <S.BoxTextBot>
              <S.TextInfo>CPF :</S.TextInfo>
              <S.TextBot>
                {user?.firstName} {user?.lastName}
              </S.TextBot>
            </S.BoxTextBot>
          </S.BoxBot>
          <S.BoxBot>
            <S.Icon>
              <AntDesign name="idcard" size={30} color={theme.COLORS.WHITE} />
            </S.Icon>

            <S.BoxTextBot>
              <S.TextInfo>CPF :</S.TextInfo>
              <S.TextBot>{user?.cpf}</S.TextBot>
            </S.BoxTextBot>
          </S.BoxBot>
          <S.BoxBot>
            <S.Icon>
              <AntDesign name="mail" size={30} color={theme.COLORS.WHITE} />
            </S.Icon>

            <S.BoxTextBot>
              <S.TextInfo>Email :</S.TextInfo>
              <S.TextBot numberOfLines={1}>{user?.email}</S.TextBot>
            </S.BoxTextBot>
          </S.BoxBot>

          <S.BoxBot>
            <S.Icon>
              <AntDesign name="phone" size={30} color={theme.COLORS.WHITE} />
            </S.Icon>

            <S.BoxTextBot>
              <S.TextInfo>Telefone :</S.TextInfo>
              <S.TextBot>{user?.phoneNumber}</S.TextBot>
            </S.BoxTextBot>
          </S.BoxBot>

          <S.TouchableOpacity onPress={updateNavigation}>
            <S.TextButtom>
              <>Editar</>
            </S.TextButtom>
          </S.TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    alignItems: "center",
    paddingBottom: "110%",
    paddingTop: "10%",
  },
});
