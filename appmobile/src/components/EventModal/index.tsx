/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal } from "react-native";

import * as S from "./styles";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { Event } from "../../configs/types";
import { api } from "../../services/api";

type EventModalProps = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
};

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const formatTime = (timeString: string) => {
  const [hour, minute] = timeString.split(":");
  const hourNumber = parseInt(hour, 10);

  let period = "manhã";

  if (hourNumber >= 12 && hourNumber < 18) {
    period = "tarde";
  } else if (hourNumber >= 18 || hourNumber < 6) {
    period = "noite";
  }

  return `${hour}:${minute} - ${period}`;
};

export const EventModal: React.FC<EventModalProps> = ({
  visible,
  event: currentEvent, // Renamed here
  onClose,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSaveEvent = (updatedEvent: Event) => {};

  const handleDeleteEvent = () => {
    setDeleteModalVisible(false);
    onClose();
  };

  useEffect(() => {
    if (currentEvent) {
      // Renamed here
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentEvent]); // Renamed here

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar animated backgroundColor="black" />

      {loading ? (
        <S.LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
        </S.LoadingContainer>
      ) : (
        currentEvent && ( // Renamed here
          <>
            <S.Container>
              <S.EventImage
                source={{
                  uri: `${api.defaults.baseURL}/${currentEvent.imageEvent}`,
                }}
              />
              <S.CloseModal onPress={onClose}>
                <AntDesign name="left" size={20} color="white" />
              </S.CloseModal>
              <S.Scroll>
                <S.EventInfoContainer>
                  <S.EventTitle>
                    {currentEvent.nameEvent}-{currentEvent.id}
                  </S.EventTitle>

                  <S.EventLocation>
                    <MaterialIcons name="location-on" size={24} color="black" />
                    <S.EventText>{currentEvent.locationEvent}</S.EventText>
                  </S.EventLocation>

                  <S.EventDate>
                    <MaterialIcons
                      name="calendar-month"
                      size={24}
                      color="black"
                    />
                    <S.EventText>
                      {formatDate(currentEvent.dateEvent)}
                    </S.EventText>
                  </S.EventDate>

                  <S.EvenHour>
                    <MaterialIcons name="access-time" size={24} color="black" />
                    <S.EventText>
                      {formatTime(currentEvent.hourEvent)}
                    </S.EventText>
                  </S.EvenHour>

                  <S.TicketPrice>${currentEvent.priceEvent}</S.TicketPrice>

                  <S.DescriptionContainer>
                    <S.DescriptionText>
                      {currentEvent.descriptionEvent}
                    </S.DescriptionText>
                  </S.DescriptionContainer>

                  <S.SignupEvent>
                    <S.SignupEventText>Participar do Evento</S.SignupEventText>
                  </S.SignupEvent>

                  <S.EditModalButton onPress={() => setEditModalVisible(true)}>
                    <S.EditModalButtonText>Editar evento</S.EditModalButtonText>
                  </S.EditModalButton>

                  <S.DeletModalButton
                    onPress={() => setDeleteModalVisible(true)}
                  >
                    <S.DeletModalButtonText>
                      Deletar evento
                    </S.DeletModalButtonText>
                  </S.DeletModalButton>
                </S.EventInfoContainer>
              </S.Scroll>
            </S.Container>

            <EditEventModal
              visible={editModalVisible}
              event={currentEvent} // Renamed here
              onClose={() => setEditModalVisible(false)}
              onSave={handleSaveEvent}
            />

            <DeletEventModal
              visible={deleteModalVisible}
              event={currentEvent} // Renamed here
              onClose={() => setDeleteModalVisible(false)}
              onDelete={handleDeleteEvent}
            />
          </>
        )
      )}
    </Modal>
  );
};
