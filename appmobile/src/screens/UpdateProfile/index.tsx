import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import MaskInput from "react-native-mask-input";
import UserAvatar from "react-native-user-avatar";

import * as S from "./styles";
import { useGetUser, useUpdateUser } from "../../configs/hooks";
import { RegisterUser } from "../../configs/types";
import { UpdateUserSchema } from "../../schemas";

export function UpdateProfile() {
  const [userCpf, setUserCpf] = useState<string | null>(null);
  // eslint-disable-next-line prettier/prettier
  const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  // eslint-disable-next-line prettier/prettier
  const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  const [loadingButton, setLoadingButton] = useState(false);

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

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUser | any>({
    mode: "onSubmit",
    resolver: yupResolver(UpdateUserSchema),
  });
  const { updateUserMutation, updateUserLoading } = useUpdateUser();
  const submitUpdateUser = async (data: RegisterUser) => {
    setLoadingButton(true);
    await updateUserMutation({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });
    setTimeout(() => setLoadingButton(false), 2000);
    onRefresh();
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      return () => {};
    }, []),
  );

  return (
    <S.Container>
      <FlashMessage position="top" />
      <S.Avatar style={{ elevation: 15 }}>
        <UserAvatar size={150} name={`${user?.firstName} ${user?.lastName}`} />
      </S.Avatar>
      <S.ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <S.box>
          {errors.firstName && (
            <S.TextErro>{errors.firstName.message}</S.TextErro>
          )}
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <S.TextUser>NOME</S.TextUser>
                <S.Input
                  placeholder={user?.firstName}
                  value={value}
                  onChangeText={onChange}
                />
              </>
            )}
          />
          {errors.lastName && (
            <S.TextErro>{errors.lastName.message}</S.TextErro>
          )}
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <S.TextUser>SOBRENOME</S.TextUser>
                <S.Input
                  placeholder={user?.lastName}
                  value={value}
                  onChangeText={onChange}
                />
              </>
            )}
          />
          {errors.cpf && <S.TextErro>{errors.cpf.message}</S.TextErro>}
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <S.TextUser>CPF</S.TextUser>
                <MaskInput
                  style={{
                    width: "100%",
                    fontSize: 18,
                    padding: 2,
                    marginBottom: 20,
                    borderBottomWidth: 2,
                  }}
                  placeholder={user?.cpf}
                  mask={CPF_MASK}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(masked, unmasked) => {
                    onChange(unmasked); // you can use the unmasked value as well
                  }}
                />
              </>
            )}
          />
          {errors.phoneNumber && (
            <S.TextErro>{errors.phoneNumber.message}</S.TextErro>
          )}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <S.TextUser>TELEFONE</S.TextUser>
                <MaskInput
                  style={{
                    width: "100%",
                    fontSize: 18,
                    padding: 2,
                    marginBottom: 20,
                    borderBottomWidth: 2,
                  }}
                  placeholder={user?.phoneNumber}
                  keyboardType="numeric"
                  mask={PHONE_MASK}
                  value={value}
                  onChangeText={(masked, unmasked) => {
                    onChange(unmasked); // you can use the unmasked value as well
                  }}
                />
              </>
            )}
          />
          {errors.email && <S.TextErro>{errors.email.message}</S.TextErro>}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <S.TextUser>EMAIL</S.TextUser>
                <S.Input
                  placeholder={user?.email}
                  value={value}
                  onChangeText={onChange}
                />
              </>
            )}
          />
        </S.box>
        <S.TouchableOpacity
          onPress={handleSubmit(submitUpdateUser)}
          isLoading={updateUserLoading}
        >
          <S.TextButtom>
            {loadingButton ? (
              <>
                <ActivityIndicator />
              </>
            ) : (
              <>SALVAR</>
            )}
          </S.TextButtom>
        </S.TouchableOpacity>
      </S.ScrollView>
    </S.Container>
  );
}
