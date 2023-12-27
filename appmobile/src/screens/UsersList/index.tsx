// UserList.js
import React from "react";

import * as S from "./styles";
import { useGetAll } from "../../components/UseGetAll";
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
      {users !== null ? (
        (users as any[])?.map((user: UserData) => (
          <S.Usuario key={user.cpf}>
            <S.TextButtom>{user.cpf}</S.TextButtom>
          </S.Usuario>
        ))
      ) : (
        <S.TextButtom>No users available</S.TextButtom>
      )}
    </S.Container>
  );
}
