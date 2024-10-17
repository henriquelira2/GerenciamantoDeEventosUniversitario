import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useCreateUser } from "../../configs/hooks";
import { RegisterUserAdmin } from "../../configs/types";
import { CreateUserAdmin } from "../../schemas";
import theme from "../../theme";
import { Picker } from "@react-native-picker/picker";

export function CreateUser() {
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
  const [hidePass, setHidePass] = useState(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegisterUserAdmin | any>({
    mode: "onSubmit",
    resolver: yupResolver(CreateUserAdmin),
  });

  const { createUserMutation, createUserLoading } = useCreateUser();

  const submitRegisterForm = async (data: RegisterUserAdmin) => {
    setLoadingButton(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setLoadingButton(false);
    await createUserMutation({
      cpf: data.cpf,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      type: data.type,
      resetToken: "",
    });
    reset();
    setLoadingButton(false);
  };

  return (
    <S.Container source={bacground}>
      <FlashMessage position="center" />
      <S.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
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
                  borderRadius: 10,
                  paddingLeft: 50,
                  backgroundColor: theme.COLORS.WHITE,
                }}
                mask={CPF_MASK}
                placeholder="CPF"
                keyboardType="numeric"
                value={value}
                onChangeText={(masked, unmasked) => {
                  onChange(unmasked);
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
        {errors.lastName && <S.TextErro>{errors.lastName.message}</S.TextErro>}
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
                  borderRadius: 10,
                  paddingLeft: 50,
                  backgroundColor: theme.COLORS.WHITE,
                }}
                placeholder="Telefone"
                keyboardType="numeric"
                mask={PHONE_MASK}
                value={value}
                onChangeText={(masked, unmasked) => {
                  onChange(unmasked);
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
        {errors.type && <S.TextErro>{errors.type.message}</S.TextErro>}
        <S.Input>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <>
                <S.TextInputSelect>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={{
                      bottom: 3,
                      right: 15,
                    }}
                  >
                    <Picker.Item
                      label="Selecione o tipo"
                      value=""
                      style={{ color: "gray" }}
                    />
                    <Picker.Item label="User" value="User" />
                    <Picker.Item label="Admin" value="Admin" />
                    <Picker.Item label="Manager" value="Manager" />
                  </Picker>
                </S.TextInputSelect>
              </>
            )}
          />
          <Feather
            name="type"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        {errors.password && <S.TextErro>{errors.password.message}</S.TextErro>}
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
              <>Cadastrar</>
            )}
          </S.TextButtomRegister>
        </S.RegisterButtom>
      </S.ScrollView>
    </S.Container>
  );
}
