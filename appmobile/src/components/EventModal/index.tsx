/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Modal } from "react-native";

import * as S from "./styles";
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
  event,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar animated backgroundColor="black" />
      {event && (
        <>
          <S.Container>
            <S.EventImage
              source={{ uri: `${api.defaults.baseURL}/${event.imageEvent}` }}
            />
            <S.CloseModal onPress={onClose}>
              <AntDesign name="left" size={20} color="white" />
            </S.CloseModal>
            <S.Scroll>
              <S.EventInfoContainer>
                <S.EventTitle>{event.nameEvent}</S.EventTitle>

                <S.EventLocation>
                  <MaterialIcons name="location-on" size={24} color="black" />
                  <S.EventText>{event.locationEvent}</S.EventText>
                </S.EventLocation>

                <S.EventDate>
                  <MaterialIcons
                    name="calendar-month"
                    size={24}
                    color="black"
                  />
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

                <S.GetTicketButton>
                  <S.GetTicketButtonText>Cadastrar-se</S.GetTicketButtonText>
                </S.GetTicketButton>
              </S.EventInfoContainer>
            </S.Scroll>
          </S.Container>
        </>
      )}
    </Modal>
  );
};
