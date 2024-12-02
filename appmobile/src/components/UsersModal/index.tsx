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

type Event = {
  id: string;
  nameEvent: string;
  locationEvent: string;
  hourEventStart: string;
  hourEventEnd: string;
  dateEventStart: string;
  dateEventEnd: string;
  durationEvent: string;
  priceEvent: number;
  descriptionEvent: string;
  imageEvent: string;
};

type UsersModalProps = {
  visible: boolean;
  eventId: string;
  name: string;
  onClose: () => void;
};

export function UsersModal({ visible, eventId, onClose }: UsersModalProps) {
  const [loading, setLoading] = useState(true);
  const [loadingC, setLoadingC] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [dataEvent, setDatEvent] = useState<Event | null>(null);
  const [showConfirmModalCert, setShowConfirmModalCert] = useState(false);

  const sendCertificates = async () => {
    setLoadingC(true)
    const data = {
      users: users.map((item) => ({
        userId: item.userId,
        email: item.email,
        userName: item.name,
      })),
      eventId: dataEvent?.id,
      eventName: dataEvent?.nameEvent,
      eventDuration: dataEvent?.durationEvent,
    };

    try {
      const response = await api.post("/certificates/send-certificates", data);
      if (response.status === 200) {
        console.log(
          "Certificados enviados com sucesso:",
          response.data.message
        );
        alert("Certificados enviados com sucesso!");
      } else {
        console.warn("Aviso:", response.data?.message || "Erro inesperado.");
        alert("Algo deu errado, mas a requisição foi processada.");
      }
    } catch (error) {
      console.error("Erro ao enviar certificados:", error);
      alert(`Erro ao enviar certificados: ${error}`);
    } finally {
      setLoadingC(false);
      setShowConfirmModalCert(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers([]);
      setLoading(true);
      try {
        const response = await api.get(`/inscriptions/event/${eventId}/users`);

        setUsers(response.data.users);
      } catch (error) {
        console.error("Erro ao buscar usuários ou eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response2 = await api.get(`/events/${eventId}`);
        setDatEvent(response2.data);
      } catch (error) {
        console.error("Erro ao buscar usuários ou eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    if (eventId && visible) {
      fetchUsers();
      fetchEvent();
    }
  }, [eventId, visible]);

  const handleConfirmCertificates = async () => {
    setShowConfirmModalCert(true);
  };

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
                  <S.TouchableOpacity onPress={handleConfirmCertificates}>
                    <S.TextButtom>Enviar Certificados</S.TextButtom>
                  </S.TouchableOpacity>

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

      <S.ModalC
        visible={showConfirmModalCert}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmModalCert(false)}
      >
        <S.ModalContainerC>
          <S.ModalContent>
            <S.ModalText>
              Deseja Enviar os Certificados Para os Participantes?
            </S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalButton onPress={sendCertificates} disabled={loadingC}>
                {loadingC ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <S.ModalButtonText>Sim</S.ModalButtonText>
                )}
              </S.ModalButton>
              <S.ModalButton onPress={() => setShowConfirmModalCert(false)}>
                <S.ModalButtonText>Não</S.ModalButtonText>
              </S.ModalButton>
            </S.ModalButtonContainer>
          </S.ModalContent>
        </S.ModalContainerC>
      </S.ModalC>
    </Modal>
  );
}
