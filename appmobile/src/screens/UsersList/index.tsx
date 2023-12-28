// UserList.js
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";

import * as S from "./styles";
import { useGetAll } from "../../components/UseGetAll";
import theme from "../../theme";
interface UserData {
  cpf: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  type: string;
}
export function UserList() {
  const { data: users, loading, error } = useGetAll();

  if (loading) {
    return (
      <S.Container>
        <S.TextButtom>Loading...</S.TextButtom>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.TextButtom>
          Error loading data: {(error as Error).message}
        </S.TextButtom>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <StatusBar style="light" />
      <S.ScrollView>
        {users !== null ? (
          (users as any[])?.map((user: UserData) => (
            <S.Usuario key={user.cpf}>
              <MaterialIcons
                name="person"
                size={30}
                color="black"
                style={{ top: 10, right: 10 }}
              />
              <S.box>
                <S.TextName>
                  {user.firstName} &nbsp; {user.lastName}
                </S.TextName>
                <S.TextCpf>{user.cpf}</S.TextCpf>
                <S.TextCpf>{user.type}</S.TextCpf>
              </S.box>
              <S.IconBtn>
                <MaterialCommunityIcons
                  name="pencil"
                  size={26}
                  color={theme.COLORS.GREEN}
                />
              </S.IconBtn>
              <S.IconBtn>
                <MaterialIcons
                  name="delete-forever"
                  size={26}
                  color={theme.COLORS.RED}
                />
              </S.IconBtn>
            </S.Usuario>
          ))
        ) : (
          <S.TextButtom>No users available</S.TextButtom>
        )}
      </S.ScrollView>
    </S.Container>
  );
}
