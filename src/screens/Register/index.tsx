import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";

export function Register() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleLogin() {
    navigation.navigate("Teste");
  }
  return (
    <S.Container>
      <S.TouchableOpacity onPress={handleLogin}>
        <S.TextButtom>Teste</S.TextButtom>
      </S.TouchableOpacity>
    </S.Container>
  );
}
