import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";

import * as S from "./styles";
import { AuthContext } from "../../contexts/auth";
import { AppBotoomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import theme from "../../theme";

type RouteParams = {
  name: string;
};

export default function HomeAdmin({
  lastName,
  firstName,
}: {
  lastName?: string;
  firstName?: string;
}) {
  const { setUser } = useContext(AuthContext);

  const Logout = async () => {
    await AsyncStorage.clear();
    setUser(false);
  };

  const navigation = useNavigation<AppBotoomTabsRoutesProps>();

  function handleNavigation(route: RouteParams) {
    // @ts-ignore
    navigation.navigate(route.name);
  }

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
              <S.Icon
                style={{ backgroundColor: theme.COLORS.RED }}
                onPress={() => handleNavigation({ name: "Profile" })}
              >
                <Ionicons name="person" size={50} color={theme.COLORS.WHITE} />
              </S.Icon>
              <S.Text>PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>

          <S.Box_1>
            <S.Touch_1>
              <S.Icon style={{ backgroundColor: theme.COLORS.GOLD }}>
                <FontAwesome5
                  name="plus"
                  size={60}
                  color={theme.COLORS.WHITE}
                />
              </S.Icon>
              <S.Text>CRIAR NOVO EVENTO</S.Text>
            </S.Touch_1>
            <S.Touch_1>
              <S.Icon
                style={{ backgroundColor: theme.COLORS.PURPLE }}
                onPress={() => handleNavigation({ name: "UpdateProfile" })}
              >
                <Ionicons
                  name="person-add"
                  size={50}
                  color={theme.COLORS.WHITE}
                />
              </S.Icon>
              <S.Text>EDITAR PERFIL</S.Text>
            </S.Touch_1>
          </S.Box_1>
          <S.Box_1>
            <S.Touch_1>
              <S.Icon
                style={{ backgroundColor: theme.COLORS.ORANGE200 }}
                onPress={() => handleNavigation({ name: "UserList" })}
              >
                <FontAwesome
                  name="group"
                  size={40}
                  color={theme.COLORS.WHITE}
                />
              </S.Icon>
              <S.Text>USUARIOS CADASTRADOS</S.Text>
            </S.Touch_1>
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
          </S.Box_1>
        </S.ScrollView>
      </S.Bot>
    </S.Container>
  );
}
