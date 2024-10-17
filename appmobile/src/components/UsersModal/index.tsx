/* eslint-disable prettier/prettier */
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Modal, FlatList, ActivityIndicator } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
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
      <S.Avatar
        style={{ resizeMode: "center" }}
        elevation={5}
        source={{
          uri: `https://api.multiavatar.com/${item?.name}.png?apikey=cbQkPid1zIYhJR`,
        }}
      />
      <S.box>
        <S.TextName numberOfLines={1}>{item.name}</S.TextName>
        <S.TextEmail numberOfLines={1}>{item.email}</S.TextEmail>
      </S.box>
    </S.UserContainer>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <S.Modal>
        <S.Topo />

        <S.Bot source={bacground}>
          <S.ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          >
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalTitle>Usuários Inscritos</S.ModalTitle>
                <S.CloseButton onPress={onClose}>
                  <AntDesign name="close" size={24} color="black" />
                </S.CloseButton>
              </S.ModalHeader>

              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : users.length === 0 ? (
                <S.NoUsersText>
                  Nenhum usuário inscrito neste evento.
                </S.NoUsersText>
              ) : (
                <>
                  <S.TotalUsersText>
                    Total de usuários inscritos: {users.length}
                  </S.TotalUsersText>
                  <FlatList
                    data={users}
                    keyExtractor={(item) => item.userId}
                    renderItem={renderUserItem}
                  />
                </>
              )}
            </S.ModalContainer>
          </S.ScrollView>
        </S.Bot>
      </S.Modal>
    </Modal>
  );
}
