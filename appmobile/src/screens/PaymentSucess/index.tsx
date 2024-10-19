import * as S from "./styles";
import sucess from "../../assets/sucesso.png";
import qr from "../../assets/qr.png";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import { useNavigation } from "@react-navigation/native";

export function PaymentSucess() {
  
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const handleEventPress = () => {
    navigation.navigate("Home");
  };

  return (
    <S.Container>
      <S.Logo source={sucess} />
      <S.TitleText>Evento Cadastrado com sucesso</S.TitleText>
      <S.Icone source={qr} />
      <S.subText>
        Apresente o qr-code disponivel na sessao de 'Meus Eventos Cadastrados'
        para realizar o chekin no dia do evento
      </S.subText>
      <S.Box>
        <S.text>Obrigado por usar nosso APP</S.text>
        <S.TouchableOpacity onPress={() => handleEventPress()}>
          <S.TextButtom>Home</S.TextButtom>
        </S.TouchableOpacity>
      </S.Box>
    </S.Container>
  );
}
