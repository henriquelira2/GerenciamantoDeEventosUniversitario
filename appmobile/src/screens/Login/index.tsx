import { Ionicons, AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import { useLogin } from "../../configs/hooks";
import { User } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { LoginSchema } from "../../schemas";
import theme from "../../theme";

export function Login() {
  // eslint-disable-next-line prettier/prettier
  const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [hidePass, setHidePass] = useState(true);

  function handleLogin() {
    navigation.navigate("Register");
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({ mode: "onSubmit", resolver: yupResolver(LoginSchema) });

  const { loginMutation, loginLoading } = useLogin();

  const submitLoginForm = ({ cpf, password }: User, data: any) => {
    loginMutation({ cpf, password });
    saveUser(cpf);
  };

  const saveUser = async (data: any) => {
    await AsyncStorage.setItem("userCPF", data);
    const value = await AsyncStorage.getItem("userCPF");

    await console.log("value" + ":" + value);
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
            paddingTop: "30%",
          }}
        >
          <S.Title>Login</S.Title>
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

          <S.LoginButtom onPress={handleSubmit(submitLoginForm)}>
            <S.TextButtomLogin>Login</S.TextButtomLogin>
          </S.LoginButtom>

          <S.RegisterButtom onPress={handleLogin}>
            <S.TextButtomRegister>Register</S.TextButtomRegister>
          </S.RegisterButtom>
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
