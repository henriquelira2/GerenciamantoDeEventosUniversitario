import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";

export function Teste() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("Login");
  }
  return (
    <S.Container>
      <S.TouchableOpacity onPress={handleLogin}>
        <S.TextButtom>Login</S.TextButtom>
      </S.TouchableOpacity>
    </S.Container>
  );
}
