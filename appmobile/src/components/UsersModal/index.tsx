/* eslint-disable prettier/prettier */
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Modal, FlatList, ActivityIndicator } from "react-native";

import * as S from "./styles";
import { api } from "../../services/api";

type User = {
  userId: string;
  name: string;
  email: string;
  inscriptionId: string;
  status: string;
};

type UsersModalProps = {
  visible: boolean;
  eventId: string;
  onClose: () => void;
};

export function UsersModal({ visible, eventId, onClose }: UsersModalProps) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers([]);
      setLoading(true);
      
      try {
        console.log(eventId);
        const response = await api.get(`/inscriptions/event/${eventId}/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId && visible) {
      fetchUsers();
    }
  }, [eventId, visible]);  

  const renderUserItem = ({ item }: { item: User }) => (
    <S.UserContainer>
      <S.UserName>{item.name}</S.UserName>
      <S.UserEmail>{item.email}</S.UserEmail>
    </S.UserContainer>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <S.ModalContainer>
        <S.ModalHeader>
          <S.CloseButton onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </S.CloseButton>
          <S.ModalTitle>Usuários Inscritos</S.ModalTitle>
        </S.ModalHeader>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : users.length === 0 ? (
          <S.NoUsersText>Nenhum usuário inscrito neste evento.</S.NoUsersText>
        ) : (
          <>
            <S.TotalUsersText>Total de usuários inscritos: {users.length}</S.TotalUsersText>
            <FlatList
              data={users}
              keyExtractor={(item) => item.userId}
              renderItem={renderUserItem}
            />
          </>
        )}
      </S.ModalContainer>
    </Modal>
  );
}
