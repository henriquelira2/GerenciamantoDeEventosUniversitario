import { Ionicons, AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import { useLogin } from "../../configs/hooks";
import { User } from "../../configs/types";
import { AuthContext } from "../../contexts/auth";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { LoginSchema } from "../../schemas";
import theme from "../../theme";

export function Login() {
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

  const { setUser } = useContext(AuthContext);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [hidePass, setHidePass] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);

  const { loginMutation, loginLoading } = useLogin();

  function handleLogin() {
    navigation.navigate("Register");
  }
  function handleForgotPassword() {
    navigation.navigate("SendPassoword");
  }

  const isAuth = async () => {
    const value = await AsyncStorage.getItem("accessToken");
    if (value !== null) {
      setUser(true);
    } else {
      console.log("err");
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({ mode: "onSubmit", resolver: yupResolver(LoginSchema) });

  const submitLoginForm = ({ cpf, password }: User, data: any) => {
    setLoadingButton(true);
    loginMutation({ cpf, password });
    saveUser(cpf);
    setTimeout(() => setLoadingButton(false), 3000);
  };

  const saveUser = async (data: any) => {
    await AsyncStorage.setItem("userCPF", data);
    const value = await AsyncStorage.getItem("userCPF");
    console.log("value: " + value);
  };

  useEffect(() => {
    isAuth();
  }, []);

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
            paddingTop: "25%",
          }}
        >
          <FlashMessage position="top" />
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
          <S.ForgotView>
            <S.ForgotTouch onPress={handleForgotPassword}>
              <S.ForgotText>Esqueceu a Senha</S.ForgotText>
            </S.ForgotTouch>
          </S.ForgotView>
          <S.LoginButtom
            onPress={handleSubmit(submitLoginForm)}
            isLoading={loginLoading}
          >
            <S.TextButtomLogin>
              {loadingButton ? (
                <>
                  <ActivityIndicator />
                </>
              ) : (
                <>Login</>
              )}
            </S.TextButtomLogin>
          </S.LoginButtom>

          <S.RegisterButtom onPress={handleLogin}>
            <S.TextButtomRegister>Register</S.TextButtomRegister>
          </S.RegisterButtom>
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
