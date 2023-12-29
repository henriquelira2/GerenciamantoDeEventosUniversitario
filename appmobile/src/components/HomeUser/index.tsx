import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import * as S from "./styles";
import { AuthContext } from "../../contexts/auth";
import { AppBotoomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import theme from "../../theme";

type RouteParams = {
  name: string;
};

export default function HomeUser({
  lastName,
  firstName,
}: {
  lastName?: string;
  firstName?: string;
}) {
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation<AppBotoomTabsRoutesProps>();

  function handleNavigation(route: RouteParams) {
    // @ts-ignore
    navigation.navigate(route.name);
  }
  const Logout = async () => {
    await AsyncStorage.clear();
    setUser(false);
  };

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
              <S.Icon
                style={{ backgroundColor: theme.COLORS.BLUE }}
                onPress={() => handleNavigation({ name: "Events" })}
              >
                <MaterialIcons
                  name="event-note"
                  size={60}
                  color={theme.COLORS.WHITE}
                />
              </S.Icon>
              <S.Text>EVENTOS</S.Text>
            </S.Touch_1>

            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.RED }}>
                <Ionicons
                  name="person"
                  size={50}
                  color={theme.COLORS.WHITE}
                  onPress={() => handleNavigation({ name: "Profile" })}
                />
              </S.Icon>
              <S.Text>PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>

          <S.Box_1>
            <S.Touch_1>
              <S.Icon
                style={{ backgroundColor: theme.COLORS.GREEN }}
                onPress={() => {
                  Logout();
                }}
              >
                <Ionicons name="power" size={60} color={theme.COLORS.WHITE} />
              </S.Icon>
              <S.Text>LOGOUT</S.Text>
            </S.Touch_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.PURPLE }}>
                <Ionicons
                  name="person-add"
                  size={50}
                  color={theme.COLORS.WHITE}
                />
              </S.Icon>
              <S.Text>EDITAR PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>
        </S.ScrollView>
      </S.Bot>
    </S.Container>
  );
}
