import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";

export function Login() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("Register");
  }
  return (
    <S.Container>
      <S.Logo
        source={require("../../assets/extensao-marca-gomos-cor.png")}
        style={{
          resizeMode: "contain",
        }}
      />
      <S.Box>
        <S.Title>Login</S.Title>
        <S.Input>
          <S.TextInput placeholder="CPF" keyboardType="numeric" />
          <Ionicons
            name="person"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Password" keyboardType="numeric" />
          <Ionicons
            name="key"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
          <S.ButtomEyes>
            <Ionicons
              name="eye"
              size={24}
              color="black"
              style={{ position: "absolute", right: 10, top: 10 }}
            />
          </S.ButtomEyes>
        </S.Input>

        <S.LoginButtom>
          <S.TextButtomLogin>Login</S.TextButtomLogin>
        </S.LoginButtom>

        <S.RegisterButtom onPress={handleLogin}>
          <S.TextButtomRegister>Register</S.TextButtomRegister>
        </S.RegisterButtom>
      </S.Box>
    </S.Container>
  );
}
