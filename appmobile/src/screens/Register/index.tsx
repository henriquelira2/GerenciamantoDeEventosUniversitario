import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import MaskInput from "react-native-mask-input";
import { Schema } from "yup";

import * as S from "./styles";
import { useCreateUser } from "../../configs/hooks";
import { RegisterUser } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { RegisterSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

export function Register() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  // eslint-disable-next-line prettier/prettier
  const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  // eslint-disable-next-line prettier/prettier
  const PHONE_MASK = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUser>({
    mode: "onSubmit",
    resolver: yupResolver(RegisterSchema),
  });

  function handleLogin() {
    navigation.navigate("Login");
  }
  const { createUserMutation } = useCreateUser();

  const submitRegisterForm = async (data: RegisterUser) => {
    await createUserMutation({
      firstName: data.firstName,
      lastName: data.lastName,
      cpf: data.cpf,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    });
  };



  return (
    <S.Container>
      <S.Logo
        source={require("../../assets/extensao-marca-gomos-cor.png")}
        style={{
          resizeMode: "contain",
        }}
      />
      <S.Box>
        <S.ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <S.Title>Register</S.Title>
          {errors.cpf && <S.TextErro>{errors.cpf.message}</S.TextErro>}
          <S.Input>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <MaskInput
                  style={{
                    width: "80%",
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 50,
                    backgroundColor: theme.COLORS.GRAY100,
                  }}
                  mask={CPF_MASK}
                  placeholder="CPF"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(masked, unmasked) => {
                    onChange(unmasked); // you can use the unmasked value as well
                  }}
                />
              )}
            />
            <AntDesign
              name="idcard"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 12 }}
            />
          </S.Input>
          {errors.firstName && (
            <S.TextErro>{errors.firstName.message}</S.TextErro>
          )}
          <S.Input>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
          </S.Input>
          {errors.lastName && (
            <S.TextErro>{errors.lastName.message}</S.TextErro>
          )}
          <S.Input>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                  placeholder="Sobrenome"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
          </S.Input>
          {errors.phoneNumber && (
            <S.TextErro>{errors.phoneNumber.message}</S.TextErro>
          )}
          <S.Input>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <MaskInput
                  style={{
                    width: "80%",
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 50,
                    backgroundColor: theme.COLORS.GRAY100,
                  }}
                  placeholder="Telefone"
                  keyboardType="numeric"
                  mask={PHONE_MASK}
                  value={value}
                  onChangeText={(masked, unmasked) => {
                    onChange(unmasked); // you can use the unmasked value as well
                  }}
                />
              )}
            />
            <AntDesign
              name="phone"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
          </S.Input>
          {errors.email && <S.TextErro>{errors.email.message}</S.TextErro>}
          <S.Input>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
          </S.Input>
          {errors.password && (
            <S.TextErro>{errors.password.message}</S.TextErro>
          )}
          <S.Input>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                  placeholder="Senha"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Ionicons
              name="key-outline"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
          </S.Input>

          <S.RegisterButtom onPress={handleSubmit(submitRegisterForm)}>
            <S.TextButtomRegister>Register</S.TextButtomRegister>
          </S.RegisterButtom>

          <S.LoginButtom onPress={handleLogin}>
            <S.TextButtomLogin>Login</S.TextButtomLogin>
          </S.LoginButtom>
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
