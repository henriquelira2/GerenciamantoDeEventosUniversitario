/* eslint-disable prettier/prettier */
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import { api } from "../../services/api";
import theme from "../../theme";

type DeleteConfirmationModalProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  event: Event | null;
};

export const DeletEventModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onDelete,
  event: currentEvent, // Renamed here
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDeletUser = async () => {
    try {
      setIsLoading(true);

      await api.delete(`/events/delete/${currentEvent?.id}`); // Renamed here

      showMessage({
        message: "Usuário Deletado com sucesso",
        type: "success",
      });

      setTimeout(() => {
        onClose();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
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
      visible={visible}
      onRequestClose={onClose}
    >
      <S.Modal>
        <S.Topo>
          <S.Title>DELETAR EVENTO</S.Title>
          <S.Closer onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </S.Closer>
        </S.Topo>
        <S.box>
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
