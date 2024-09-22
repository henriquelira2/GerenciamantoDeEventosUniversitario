/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";

import * as S from "./styles";
import { Checkin } from "../../components/Checkin";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { UsersModal } from "../../components/UsersModal";
import { api } from "../../services/api";

type Event = {
  id: string;
  nameEvent: string;
  locationEvent: string;
  dateEvent: string;
  hourEvent: string;
  priceEvent: number;
  descriptionEvent: string;
  imageEvent: string;
};

type EventDetailsMasterRouteProp = RouteProp<
  { EventDetailsMaster: { event: Event } },
  "EventDetailsMaster"
>;

export function EventDetailsMaster() {
  const route = useRoute<EventDetailsMasterRouteProp>();
  const navigation = useNavigation();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const [checkinModalVisible, setCheckinModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.event) {
      setEvent(route.params.event);
    }
  }, [route.params?.event]);

  const handleDeleteEvent = () => {};

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await api.get(`/events/${event?.id}`);
      if (response.data) {
        setEvent(response.data);
      }
    } catch (error) {
      console.error("Falha ao recarregar os dados", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!event) {
    return (
      <S.Container>
        <S.EventText>Nenhum evento selecionado</S.EventText>
      </S.Container>
    );
  }

  const handleEventPress = () => {
    //@ts-ignore
    navigation.navigate("MyCreatedEvents");
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

  const eventData = [
    { key: "location", icon: "location-on", text: event.locationEvent },
    { key: "date", icon: "calendar-month", text: formatDate(event.dateEvent) },
    { key: "time", icon: "access-time", text: formatTime(event.hourEvent) },
    { key: "price", icon: "price-change", text: `$${event.priceEvent}` },
    { key: "description", icon: null, text: event.descriptionEvent },
  ];

  const iconMap: { [key: string]: keyof typeof MaterialIcons.glyphMap } = {
    "location-on": "location-on",
    "calendar-month": "calendar-today",
    "access-time": "access-time",
    "price-change": "price-change",
  };

  const renderEventItem = ({ item }: { item: (typeof eventData)[0] }) => (
    <S.EventInfoContainer>
      {item.icon && iconMap[item.icon] && (
        <MaterialIcons name={iconMap[item.icon]} size={24} color="black" />
      )}
      <S.EventText>{item.text}</S.EventText>
    </S.EventInfoContainer>
  );

  return (
    <S.Container>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <S.EventImage
            source={{ uri: `${api.defaults.baseURL}/${event.imageEvent}` }}
          />

          <S.CloseModal onPress={handleEventPress}>
            <AntDesign name="left" size={20} color="white" />
          </S.CloseModal>

          <FlatList
            data={eventData}
            keyExtractor={(item) => item.key}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={renderEventItem}
            ListHeaderComponent={() => (
              <S.EventTitle>{event.nameEvent}</S.EventTitle>
            )}
            ListFooterComponent={() => (
              <>
                <S.BtnBox>
                  <S.CheckinsModalButton
                    onPress={() => setCheckinModalVisible(true)}
                  >
                    <S.CheckinsModalButtonText>
                      Realizar Check-in
                    </S.CheckinsModalButtonText>
                  </S.CheckinsModalButton>

                  <S.UsersModalButton
                    onPress={() => setUsersModalVisible(true)}
                  >
                    <S.UsersModalButtonText>
                      Usuários cadastrados
                    </S.UsersModalButtonText>
                  </S.UsersModalButton>

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
                </S.BtnBox>
              </>
            )}
          />
        </>
      )}

      <Checkin
        visible={checkinModalVisible}
        onClose={() => setCheckinModalVisible(false)}
        onRefresh={handleRefresh}
      />

      <UsersModal
        visible={usersModalVisible}
        eventId={event.id}
        onClose={() => setUsersModalVisible(false)}
      />

      <EditEventModal
        visible={editModalVisible}
        //@ts-ignore
        event={event}
        onClose={() => setEditModalVisible(false)}
        onRefresh={handleRefresh}
      />

      <DeletEventModal
        visible={deleteModalVisible}
        //@ts-ignore
        event={event}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteEvent}
      />
    </S.Container>
  );
}
