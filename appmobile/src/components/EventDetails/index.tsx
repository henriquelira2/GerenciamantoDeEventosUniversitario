/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import * as S from "./styles";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { Event } from "../../configs/types";
import { api } from "../../services/api";

type EventDetailsProps = {
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

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
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
    if (event) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [event]);

  if (loading || !event) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </S.LoadingContainer>
    );
  }

  return (
    <View>
      <StatusBar animated backgroundColor="black" />

      <S.Container>
        <S.EventImage
          source={{
            uri: `${api.defaults.baseURL}/${event.imageEvent}`,
          }}
        />
        <S.CloseModal onPress={onClose}>
          <AntDesign name="left" size={20} color="white" />
        </S.CloseModal>
        <S.Scroll>
          <S.EventInfoContainer>
            <S.EventTitle>
              {event.nameEvent}-{event.id}
            </S.EventTitle>

            <S.EventLocation>
              <MaterialIcons name="location-on" size={24} color="black" />
              <S.EventText>{event.locationEvent}</S.EventText>
            </S.EventLocation>

            <S.EventDate>
              <MaterialIcons name="calendar-month" size={24} color="black" />
              <S.EventText>{formatDate(event.dateEvent)}</S.EventText>
            </S.EventDate>

            <S.EvenHour>
              <MaterialIcons name="access-time" size={24} color="black" />
              <S.EventText>{formatTime(event.hourEvent)}</S.EventText>
            </S.EvenHour>

            <S.TicketPrice>${event.priceEvent}</S.TicketPrice>

            <S.DescriptionContainer>
              <S.DescriptionText>
                {event.descriptionEvent}
              </S.DescriptionText>
            </S.DescriptionContainer>

            <S.SignupEvent>
              <S.SignupEventText>Participar do Evento</S.SignupEventText>
            </S.SignupEvent>

            <S.EditModalButton onPress={() => setEditModalVisible(true)}>
              <S.EditModalButtonText>Editar evento</S.EditModalButtonText>
            </S.EditModalButton>

            <S.DeletModalButton onPress={() => setDeleteModalVisible(true)}>
              <S.DeletModalButtonText>Deletar evento</S.DeletModalButtonText>
            </S.DeletModalButton>
          </S.EventInfoContainer>
        </S.Scroll>
      </S.Container>

      <EditEventModal
        visible={editModalVisible}
        //@ts-ignore
        event={event}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveEvent}
      />

      <DeletEventModal
        visible={deleteModalVisible}
         //@ts-ignore
        event={event}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
};
