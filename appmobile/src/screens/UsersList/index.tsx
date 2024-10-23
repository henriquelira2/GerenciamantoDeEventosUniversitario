import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
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
    //@ts-ignore
    const filteredList = users.filter((user) => {
      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredUsers(filteredList);
  };

  const handleEditModalOpen = (user: UserData) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const renderUserItem = ({ item: user }: { item: UserData }) => (
    <S.Usuario key={user.cpf}>
      <S.Avatar
        style={{
          resizeMode: "center",
        }}
        elevation={5}
        source={{
          uri: `https://api.multiavatar.com/${user?.firstName}${user?.lastName}.png?apikey=cbQkPid1zIYhJR`,
        }}
      />
      <S.box>
        <S.TextName numberOfLines={1}>
          {user.firstName} &nbsp; {user.lastName}
        </S.TextName>
        <S.TextCpf> {user.cpf}</S.TextCpf>
        <S.TextCpf />
      </S.box>
      <S.IconBtn
        onPress={() => handleEditModalOpen(user)} // Chama função de abrir modal com usuário atualizado
      >
        <MaterialCommunityIcons
          name="pencil"
          size={26}
          color={theme.COLORS.GREEN100}
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
          color={theme.COLORS.GRAY100}
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
    <S.Container source={bacground}>
      <S.Search>
        <S.InputSeach
          placeholder="Nome Completo"
          onChangeText={(text: React.SetStateAction<string>) =>
            setSearchQuery(text)
          }
          value={searchQuery}
        />
        <MaterialIcons
          name="search"
          size={26}
          color="white"
          style={{ position: "absolute", left: 10, top: 12 }}
        />
      </S.Search>

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
          setSelectedUser(null);
          onRefresh();
        }}
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        user={selectedUser}
        onClose={() => setDeleteModalVisible(false)}
        onReset={function (): void {
          onRefresh();
        }}
      />
    </S.Container>
  );
}
