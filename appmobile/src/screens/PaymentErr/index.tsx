import * as S from "./styles";
import err from "../../assets/marca-x.png";
import problm from "../../assets/pergunta.png";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import { useNavigation } from "@react-navigation/native";

export function PaymentErr() {
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const handleEventPress = () => {
    navigation.navigate("Home");
  };

  return (
    <S.Container>
      <S.Logo source={err} />
      <S.TitleText>OOps ! Algo deu Errado</S.TitleText>
      <S.Icone source={problm} />
      <S.Box>
        <S.text>Falha</S.text>
        <S.TouchableOpacity onPress={() => handleEventPress()}>
          <S.TextButtom>Home</S.TextButtom>
        </S.TouchableOpacity>
      </S.Box>
    </S.Container>
  );
}
