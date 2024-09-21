/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, FlatList, ActivityIndicator } from "react-native";

import * as S from "./styles";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { PaymentWebView } from "../../components/PaymentWebView";
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

type EventDetailsRouteProp = RouteProp<
  { EventDetails: { event: Event; userId: string } },
  "EventDetails"
>;

export function EventDetails() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation();
  const initialEvent = route.params?.event;
  const userId = route.params?.userId;
  const [event, setEvent] = useState<Event | null>(initialEvent);
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteEvent = () => {};

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // @ts-ignore
      const response = await api.get(`/events/${event.id}`);
      if (response.data) {
        setEvent(response.data);
      }
    } catch (error) {
      console.error("Falha ao recarreagros dados", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleInscription = async () => {
    setLoading(true);
    try {
      const response = await api.post("/inscriptions/create", {
        userId,
        // @ts-ignore
        eventId: event.id,
        // @ts-ignore
        amount: event.priceEvent * 100,
        paymentMethod: "CREDIT_CARD",
      });

      const { paymentLink } = response.data;

      if (paymentLink) {
        setPaymentLink(paymentLink);
        setShowPaymentModal(true);
      } else {
        Alert.alert("Erro", "Link de pagamento não disponível.");
      }
    } catch (error) {
      console.error("Erro1 : ", error);

      if (error instanceof Error && (error as any).response) {
        const axiosError = error as any;

        if (axiosError.response.status === 408) {
          Alert.alert("Erro", "Você já está inscrito neste evento.");
        } else {
          Alert.alert("Erro", "Houve um problema ao processar o pagamento.");
        }
        if (axiosError.response.status === 409) {
          Alert.alert("Erro", "Evento Esgotado");
        }
      } else {
        Alert.alert("Erro", "Houve um problema ao se conectar ao servidor.");
      }
    } finally {
      setLoading(false);
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
    // @ts-ignore
    navigation.navigate("Eventos");
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
    { key: "price", icon: null, text: `$${event.priceEvent}` },
    { key: "description", icon: null, text: event.descriptionEvent },
  ];

  const iconMap: { [key: string]: keyof typeof MaterialIcons.glyphMap } = {
    "location-on": "location-on",
    "calendar-month": "calendar-today",
    "access-time": "access-time",
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
            source={{
              uri: `${api.defaults.baseURL}/${event.imageEvent}`,
            }}
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
                  <S.SignupEvent onPress={handleInscription}>
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
                </S.BtnBox>
              </>
            )}
          />
        </>
      )}

      <PaymentWebView
        visible={showPaymentModal}
        paymentLink={paymentLink}
        onClose={() => setShowPaymentModal(false)}
      />

      <EditEventModal
        visible={editModalVisible}
        // @ts-ignore
        event={event}
        onClose={() => setEditModalVisible(false)}
        onRefresh={handleRefresh}
      />

      <DeletEventModal
        visible={deleteModalVisible}
        // @ts-ignore
        event={event}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteEvent}
      />
    </S.Container>
  );
}
