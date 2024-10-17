/* eslint-disable prettier/prettier */
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
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
  event: currentEvent,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteEvent = async () => {
    try {
      setIsLoading(true);
      //@ts-ignore
      await api.delete(`/events/delete/${currentEvent?.id}`);

      showMessage({
        message: "Evento deletado com sucesso",
        type: "success",
      });

      onClose();
      setTimeout(() => {
        //@ts-ignore
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      //@ts-ignore
      const errorMessage =  error?.response?.data?.error || "Erro ao deletar evento";

      showMessage({
        message: errorMessage,
        type: "danger",
      });
      onClose();
      console.error("Erro:", errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <FlashMessage position="top" />
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <S.Modal>
          <S.Topo />

          <S.Bot source={bacground}>
            <S.ScrollView
              contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            >
            

              <S.Title> Deletar Evento</S.Title>

              <S.Buttom>
                <S.TouchableOpacity
                  onPress={onDeleteEvent}
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

              <S.CloseModal onPress={onClose}>
                <AntDesign name="close" size={30} color="black" />
              </S.CloseModal>

            </S.ScrollView>
          </S.Bot>
        </S.Modal>
      </Modal>
    </>
  );
};
