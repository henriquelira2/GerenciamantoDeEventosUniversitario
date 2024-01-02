import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";
import theme from "../../theme";

export function SendPassoword() {
  const [cpf, setCpf] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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
  const handleSendPassword = async () => {
    await setLoadingButton(true);
    try {
      console.log(cpf);
      const response = await api.post(`/send-password/${cpf}`);

      if (response.data.success) {
        await Alert.alert(
          "Sucesso",
          "E-mail de recuperação de senha enviado com sucesso",
        );
        await AsyncStorage.setItem("TokenCPF", cpf);
        await navigation.navigate("ResetPassoword");
      } else {
        Alert.alert("Error", response.data.error || "Um erro ocorreu");
      }
    } catch (error) {
      console.error(
        "Erro ao enviar solicitação de recuperação de senha",
        error,
      );
      Alert.alert("Erro", "Ocorreu um erro ao enviar a solicitação");
    }
    await setLoadingButton(false);
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
            paddingTop: "25%",
          }}
        >
          <S.Title>Redefinir sua senha - 1</S.Title>
          <S.TextInfo>
            Digite o CPF verificado da sua conta de usuário e lhe enviaremos um
            com um codigo de redefinição de senha.
          </S.TextInfo>
          <S.Input>
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
              value={cpf}
              onChangeText={(masked, unmasked) => {
                setCpf(unmasked);
              }}
            />
            <AntDesign
              name="idcard"
              size={24}
              color="black"
              style={{ position: "absolute", left: 10, top: 12 }}
            />
          </S.Input>
          <S.SendButtom onPress={handleSendPassword}>
            <S.TextButtom>
              {loadingButton ? (
                <>
                  <ActivityIndicator />
                </>
              ) : (
                <>Next</>
              )}
            </S.TextButtom>
          </S.SendButtom>
          <S.iconRun>
            <FontAwesome5 name="running" size={24} color={theme.COLORS.RED} />
            <FontAwesome5 name="running" size={24} color={theme.COLORS.GOLD} />
          </S.iconRun>
        </S.ScrollView>
      </S.Box>
    </S.Container>
  );
}
