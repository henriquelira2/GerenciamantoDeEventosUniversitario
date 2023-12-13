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
      <S.TouchableOpacity onPress={handleLogin}>
        <S.TextButtom>Register2</S.TextButtom>
      </S.TouchableOpacity>
    </S.Container>
  );
}
