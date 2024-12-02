/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";

import * as S from "./styles";
import { Checkin } from "../../components/Checkin";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { UsersModal } from "../../components/UsersModal";
import { api } from "../../services/api";
import FlashMessage from "react-native-flash-message";

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

  const formatPrice = (price: number | string) => {
    const parsedPrice = parseFloat(price as string);
    return parsedPrice === 0
      ? "Grátis"
      : `R$ ${parsedPrice.toFixed(2).replace(".", ",")}`;
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

  const handleDeleteEvent = (message: string, type: "success" | "danger") => {
    // @ts-ignore
    navigation.navigate("MyCreatedEvents", { message, type });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const formattedStart = format(new Date(startDate), "dd/MM/yyyy    ");
    const formattedEnd = format(new Date(endDate), "   dd/MM/yyyy");
    return `${formattedStart} até ${formattedEnd}`;
  };

  const eventData = [
    { key: "location", icon: "location-on", text: event.locationEvent },
    {
      key: "date",
      icon: "calendar-month",
      text: formatDateRange(event.dateEventStart, event.dateEventEnd),
    },
    {
      key: "time",
      icon: "access-time",
      text:
        "De " +
        event.hourEventStart.split(":").slice(0, 2).join(":") +
        " até " +
        event.hourEventEnd.split(":").slice(0, 2).join(":") +
        " - " +
        event.durationEvent +"h",
    },
    {
      key: "price",
      icon: "sell",
      //@ts-ignore
      text:
        formatPrice(event.priceEvent) === "0"
          ? "Grátis"
          : `${formatPrice(event.priceEvent)}`,
    },
    { key: "description", icon: null, text: event.descriptionEvent },
  ];

  const iconMap: { [key: string]: keyof typeof MaterialIcons.glyphMap } = {
    "location-on": "location-on",
    "calendar-month": "calendar-today",
    "access-time": "access-time",
    sell: "sell",
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
      <FlashMessage position="center" />
      <S.BoxContainer>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            <S.Topo>
              <S.EventImage
                source={{
                  uri: `${api.defaults.baseURL}/${event.imageEvent}`,
                }}
                resizeMode="stretch"
              />
            </S.Topo>
            <S.Bot>
              <S.ConfigView>
                <S.BtnAction onPress={() => setCheckinModalVisible(true)}>
                  <MaterialIcons name="check-circle" size={24} color="green" />
                </S.BtnAction>
                <S.BtnAction onPress={() => setUsersModalVisible(true)}>
                  <MaterialIcons name="groups" size={24} color="blue" />
                </S.BtnAction>
                <S.BtnAction onPress={() => setEditModalVisible(true)}>
                  <MaterialIcons
                    name="edit-calendar"
                    size={24}
                    color="orange"
                  />
                </S.BtnAction>
                <S.BtnAction onPress={() => setDeleteModalVisible(true)}>
                  <MaterialIcons name="delete-forever" size={24} color="red" />
                </S.BtnAction>
              </S.ConfigView>

              <S.FlatList
                data={eventData}
                //@ts-ignore
                keyExtractor={(item) => item.key}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={renderEventItem}
                ListHeaderComponent={() => (
                  <S.EventTitleView>
                    <S.EventTitle>{event.nameEvent}</S.EventTitle>
                  </S.EventTitleView>
                )}
              />
            </S.Bot>
            <S.CloseModal onPress={handleEventPress}>
              <MaterialIcons name="chevron-left" size={20} color="white" />
            </S.CloseModal>
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
          name={event.nameEvent}
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
          // @ts-ignore
          event={event}
          // @ts-ignore
          onDelete={handleDeleteEvent}
          onClose={() => setDeleteModalVisible(false)}
        />
      </S.BoxContainer>
    </S.Container>
  );
}
