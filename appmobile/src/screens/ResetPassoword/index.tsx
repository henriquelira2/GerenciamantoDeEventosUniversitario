/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useGetUser } from "../../configs/hooks";
import { NewPassword } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { ForgotPassWordSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

export function ResetPassoword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userCpfToken, setUserCpfToken] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [hidePass, setHidePass] = useState(true);

  const isAuth = async () => {
    const value = await AsyncStorage.getItem("TokenCPF");
    console.log(value);
    setUserCpfToken(value);
  };
  const { data: user, refetch: userRefetch } = useGetUser({
    cpf: userCpfToken || "",
  });

  const TokenIsValid = async () => {
    await setLoadingButton(true);

    if (token === user?.resetToken) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await setTokenValid(true);
      setLoadingButton(false);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoadingButton(false);
      Alert.alert("Erro", "Token Inválido");
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewPassword>({
    mode: "onSubmit",
    resolver: yupResolver(ForgotPassWordSchema),
  });

  const NewPasswordSubmit = async () => {
    try {
      setLoadingButton(true);
      const response = await api.post(`users/reset-password/${token}`, {
        newPassword,
      });

      if (response.data.success) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await setLoadingButton(false);
        await Alert.alert("Sucesso", "Senha alterada com sucesso");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.error || "Um erro ocorreu");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred ");
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

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
            paddingTop: "25%",
          }}
        >
          {tokenValid ? (
            <>
              <S.Title>Redefinir sua senha - 3</S.Title>
              <S.TextInfo>Digite Sua Nova Senha</S.TextInfo>
              {errors.password && (
                <S.TextErro>{errors.password.message}</S.TextErro>
              )}
              <S.Input>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <S.TextInput
                      placeholder="Nova Senha"
                      value={value}
                      onChangeText={(text: any) => {
                        setNewPassword(text);
                        onChange(text);
                      }}
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
              <S.RestButtom onPress={handleSubmit(NewPasswordSubmit)}>
                <S.TextButtomRest>
                  {loadingButton ? (
                    <>
                      <ActivityIndicator />
                    </>
                  ) : (
                    <>Next</>
                  )}
                </S.TextButtomRest>
              </S.RestButtom>
              <S.iconRun>
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.RED}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.GOLD}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.GREEN}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.ORANGE}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.YELLOW}
                />
              </S.iconRun>
            </>
          ) : (
            <>
              <S.Title>Redefinir sua senha - 2</S.Title>
              <S.TextInfo>Digite o Codigo encaminado por email</S.TextInfo>
              <S.Input>
                <S.TextInput
                  placeholder="TOKEN"
                  value={token}
                  onChangeText={(text: SetStateAction<string>) => {
                    setToken(text);
                  }}
                />
                <MaterialCommunityIcons
                  name="account-key-outline"
                  size={24}
                  color="black"
                  style={{ position: "absolute", left: 10, top: 12 }}
                />
              </S.Input>
              <S.RestButtom onPress={TokenIsValid}>
                <S.TextButtomRest>
                  {loadingButton ? (
                    <>
                      <ActivityIndicator />
                    </>
                  ) : (
                    <>Next</>
                  )}
                </S.TextButtomRest>
              </S.RestButtom>
              <S.iconRun>
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.GREEN}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.ORANGE}
                />
                <FontAwesome5
                  name="running"
                  size={24}
                  color={theme.COLORS.YELLOW}
                />
              </S.iconRun>
            </>
          )}
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
