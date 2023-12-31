import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";

import * as S from "./styles";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import { useGetAll } from "../../components/UseGetAll";
import { api } from "../../services/api";
import theme from "../../theme";

export interface UserData {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);

    try {
      const response = await api.get(`/users/all`);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (users) {
      filterUsers();
    }
  }, [searchQuery, users]);

  const filterUsers = () => {
    const filteredList = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return (
        user.cpf.includes(searchQuery) ||
        fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredUsers(filteredList);
  };
  const renderUserItem = ({ item: user }: { item: UserData }) => (
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
      <S.IconBtn
        onPress={() => {
          setSelectedUser(user);
          setEditModalVisible(true);
        }}
      >
        <MaterialCommunityIcons
          name="pencil"
          size={26}
          color={theme.COLORS.GREEN}
        />
      </S.IconBtn>
      <S.IconBtn
        onPress={() => {
          setSelectedUser(user);
          setDeleteModalVisible(true);
        }}
      >
        <MaterialIcons
          name="delete-forever"
          size={26}
          color={theme.COLORS.RED}
        />
      </S.IconBtn>
    </S.Usuario>
  );

  if (loading) {
    return (
      <S.Container>
        <S.TextButtom>Carregando...</S.TextButtom>
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
      <S.Filter>
        <S.InputFilter
          placeholder="Digite um CPF ou Nome Completo"
          onChangeText={(text: React.SetStateAction<string>) =>
            setSearchQuery(text)
          }
          value={searchQuery}
        />
        <Ionicons
          name="search"
          size={30}
          color="black"
          style={{ top: 5, right: 10 }}
        />
      </S.Filter>

      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user.cpf}
        renderItem={renderUserItem}
        ListEmptyComponent={() => (
          <S.TextButtom>Nenhum usuário encontrado</S.TextButtom>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      <EditModal
        isVisible={isEditModalVisible}
        user={selectedUser}
        onClose={() => {
          setEditModalVisible(false);
          onRefresh(); // Chame a função de atualização ao fechar o modal
        }}
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        user={selectedUser}
        onClose={() => setDeleteModalVisible(false)}
      />
    </S.Container>
  );
}
