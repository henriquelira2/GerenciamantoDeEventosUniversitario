import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import { UserData } from "../../screens/UsersList";
import { api } from "../../services/api";
import theme from "../../theme";
interface DeleteModalProps {
  isVisible: boolean;
  user: UserData | null;
  onClose: () => void;
  onReset: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isVisible,
  user,
  onClose,
  onReset,
}) => {
  if (!user) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  const onDeletUser = async () => {
    try {
      setIsLoading(true);

      await api.delete(`/users/delete/${user?.cpf}`);
      alert("Usuário Deletado com sucesso");
      showMessage({
        message: "Usuário Deletado com sucesso",
        type: "success",
      });

      // Adicione um delay de 1 segundo antes de fechar o modal
      setTimeout(() => {
        onClose();
        setIsLoading(false);
        onReset();
      }, 1000);
    } catch (error) {
      alert("Erro ao Deletar usuário");
      showMessage({
        message: "Erro ao Deletar usuário",
        type: "danger",
      });
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.Modal>
        <S.Topo>
          <S.Title>DELETAR USUARIO</S.Title>
          <S.Closer onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </S.Closer>
        </S.Topo>
        <S.box>
          <FlashMessage position="center" />
          <S.Alert>Deseja Excluir o Usuario</S.Alert>
          <S.Alert>{user.cpf}</S.Alert>
          <S.Buttom>
            <S.TouchableOpacity
              onPress={onDeletUser}
              style={{ backgroundColor: theme.COLORS.GREEN }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <S.TextButtom>SIM</S.TextButtom>
              )}
            </S.TouchableOpacity>
            <S.TouchableOpacity
              onPress={onClose}
              style={{ backgroundColor: theme.COLORS.GREEN }}
            >
              <S.TextButtom>NAO</S.TextButtom>
            </S.TouchableOpacity>
          </S.Buttom>
        </S.box>
      </S.Modal>
    </Modal>
  );
};

export default DeleteModal;
