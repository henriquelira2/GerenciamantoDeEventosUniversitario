import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useCreateUser } from "../../configs/hooks";
import { RegisterUser } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { RegisterSchema } from "../../schemas";
import theme from "../../theme";

export function Register() {
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

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [loadingButton, setLoadingButton] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUser | any>({
    mode: "onSubmit",
    resolver: yupResolver(RegisterSchema),
  });

  function handleLogin() {
    navigation.navigate("Login");
  }

  const { createUserMutation, createUserLoading } = useCreateUser();

  const submitRegisterForm = async (data: RegisterUser) => {
    try {
      setLoadingButton(true);
      await createUserMutation({
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        resetToken: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <S.Container source={bacground}>
      <S.Logo
        source={require("../../assets/Logo.png")}
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
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={hidePass}
                />
              )}
            />
            <Ionicons
              name="key-outline"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 10 }}
            />
            <S.ButtomEyes onPress={() => setHidePass(!hidePass)}>
              <Ionicons
                name="eye"
                size={24}
                color="black"
                style={{ position: "absolute", right: 10, top: 13 }}
              />
            </S.ButtomEyes>
          </S.Input>

          <S.RegisterButtom
            onPress={handleSubmit(submitRegisterForm)}
            isLoading={createUserLoading}
          >
            <S.TextButtomRegister>
              {loadingButton ? (
                <>
                  <ActivityIndicator />
                </>
              ) : (
                <>Register</>
              )}
            </S.TextButtomRegister>
          </S.RegisterButtom>

          <S.LoginButtom onPress={handleLogin}>
            <S.TextButtomLogin>Login</S.TextButtomLogin>
          </S.LoginButtom>
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
