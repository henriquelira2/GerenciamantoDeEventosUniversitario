import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useGetUser, useUpdateUser } from "../../configs/hooks";
import { RegisterUser } from "../../configs/types";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import { UpdateUserSchema } from "../../schemas";

export function UpdateProfile() {
  const [userCpf, setUserCpf] = useState<string | null>(null);
  // eslint-disable-next-line prettier/prettier
  const CPF_MASK = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];
  // eslint-disable-next-line prettier/prettier
  const PHONE_MASK = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const [loadingButton, setLoadingButton] = useState(false);

  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  function profileNavigation() {
    navigation.navigate("Perfil");
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

  const { data: user, refetch: userRefetch } = useGetUser({
    cpf: userCpf || "",
  });

  const { control, handleSubmit, reset } = useForm<RegisterUser | any>({
    mode: "onSubmit",
    resolver: yupResolver(UpdateUserSchema),
  });

  useEffect(() => {
    onRefresh();
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        cpf: user.cpf,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [user, reset]);

  const { updateUserMutation, updateUserLoading } = useUpdateUser();
  const submitUpdateUser = async (data: RegisterUser) => {
    setLoadingButton(true);
    await updateUserMutation({
      cpf: data.cpf,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      resetToken: "",
    });
    setTimeout(() => setLoadingButton(false), 2000);
    onRefresh();
    setTimeout(() => profileNavigation(), 10000);
  };

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
          <FlashMessage position="center" style={{ zIndex: 999 }} />
          {user ? (
            <>
              <S.Avatar
                style={{
                  resizeMode: "center",
                }}
                elevation={5}
                source={{
                  uri: `https://api.multiavatar.com/${user?.firstName}${user?.lastName}.png?apikey=cbQkPid1zIYhJR`,
                }}
              />

              <S.box>
                <Controller
                  control={control}
                  name="firstName"
                  defaultValue={user.firstName}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <S.TextUser>NOME</S.TextUser>
                      <S.Input value={value} onChangeText={onChange} />
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="lastName"
                  defaultValue={user.lastName}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <S.TextUser>SOBRENOME</S.TextUser>
                      <S.Input value={value} onChangeText={onChange} />
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="cpf"
                  defaultValue={user.cpf}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <S.TextUser>CPF</S.TextUser>
                      <MaskInput
                        style={{
                          width: "100%",
                          fontSize: 18,
                          padding: 2,
                          marginBottom: 20,
                          borderBottomWidth: 1,
                          color: "#FFF",
                        }}
                        mask={CPF_MASK}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={(masked, unmasked) => {
                          onChange(unmasked);
                        }}
                      />
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <S.TextUser>TELEFONE</S.TextUser>
                      <MaskInput
                        style={{
                          width: "100%",
                          fontSize: 18,
                          padding: 2,
                          marginBottom: 20,
                          borderBottomWidth: 1,
                          color: "#FFF",
                        }}
                        keyboardType="numeric"
                        mask={PHONE_MASK}
                        value={value}
                        onChangeText={(masked, unmasked) => {
                          onChange(unmasked);
                        }}
                      />
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  defaultValue={user.email}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <S.TextUser>EMAIL</S.TextUser>
                      <S.Input value={value} onChangeText={onChange} />
                    </>
                  )}
                />
              </S.box>
              <S.TouchableOpacity
                onPress={handleSubmit(submitUpdateUser)}
                isLoading={updateUserLoading}
              >
                <S.TextButtom>
                  {loadingButton ? <ActivityIndicator /> : "SALVAR"}
                </S.TextButtom>
              </S.TouchableOpacity>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
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
    paddingBottom: "50%",
    paddingTop: "10%",
  },
});
