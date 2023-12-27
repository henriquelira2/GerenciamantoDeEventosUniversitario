import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import * as S from "./styles";
import theme from "../../theme";
export default function HomeManager({ lastName, firstName }) {
  return (
    <S.Container>
      <S.Top>
        <S.ImageTop
          source={require("../../assets/extensao-marca-gomos-cor.png")}
          style={{
            resizeMode: "contain",
          }}
        />
      </S.Top>
      <S.Bot>
        <S.ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <S.User>
            <Ionicons name="person" size={20} />
            <S.TextUser>{firstName}</S.TextUser>
            <S.TextUser>{lastName}</S.TextUser>
          </S.User>
          <S.Box_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.BLUE }}>
                <MaterialIcons name="event-note" size={60} color="#fff" />
              </S.Icon>
              <S.Text>EVENTOS</S.Text>
            </S.Touch_1>

            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.RED }}>
                <Ionicons name="person" size={50} color="#fff" />
              </S.Icon>
              <S.Text>PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>

          <S.Box_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.GOLD }}>
                <FontAwesome5 name="plus" size={60} color="#fff" />
              </S.Icon>
              <S.Text>CRIAR NOVO EVENTO</S.Text>
            </S.Touch_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.PURPLE }}>
                <Ionicons name="person-add" size={50} color="#fff" />
              </S.Icon>
              <S.Text>EDITAR PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>
          <S.Box_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.GREEN }}>
                <Ionicons name="power" size={60} color="#fff" />
              </S.Icon>
              <S.Text>LOGOUT</S.Text>
            </S.Touch_1>
            <S.Touch_1 />
          </S.Box_1>
        </S.ScrollView>
      </S.Bot>
    </S.Container>
  );
}
