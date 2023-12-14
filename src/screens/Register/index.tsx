import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";

export function Register() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("Login");
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
        <S.Title>Register</S.Title>
        <S.Input>
          <S.TextInput placeholder="CPF" keyboardType="numeric" />
          <AntDesign
            name="idcard"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 12 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Nome" />
          <Ionicons
            name="person-outline"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Sobrenome" />
          <Ionicons
            name="person-outline"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Telefone" keyboardType="numeric" />
          <AntDesign
            name="phone"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Email" />
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>
        <S.Input>
          <S.TextInput placeholder="Senha" keyboardType="numeric" />
          <Ionicons
            name="key-outline"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </S.Input>

        <S.RegisterButtom>
          <S.TextButtomRegister>Register</S.TextButtomRegister>
        </S.RegisterButtom>

        <S.LoginButtom onPress={handleLogin}>
          <S.TextButtomLogin>Login</S.TextButtomLogin>
        </S.LoginButtom>
      </S.Box>
    </S.Container>
  );
}
