/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";

import * as S from "./styles";
import { DeletEventModal } from "../../components/DeletEventModal";
import { EditEventModal } from "../../components/EditEventModal";
import { Event } from "../../configs/types";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";
import { api } from "../../services/api";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

type EventDetailsRouteProp = RouteProp<
  { EventDetails: { event: Event; userId: string } },
  "EventDetails"
>;
export function EventDetails() {
  const route = useRoute<EventDetailsRouteProp>();
  const event = route.params?.event;
  const userId = route.params?.userId;
  const navigation = useNavigation<AppBottomTabsRoutesProps>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleDeleteEvent = () => {};

  const fetchEvents = async () => {
    setLoading(true);
    try {
      await api.get("/events/all");
      await api.get(`/events/${event.id}`);
      console.log("ID do usuário:", userId);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const handleEventPress = () => {
    navigation.navigate("Eventos");
  };

  const handleInscription = async () => {
    console.log("Iniciando processo de inscrição e pagamento:", {
      userId,
      eventId: event.id,
    });

    try {
      // 1. Create PaymentIntent and receive clientSecret
      const response = await api.post("/payments/create-payment-intent", {
        userId,
        eventId: event.id,
        amount: event.priceEvent * 100,
      });

      const { clientSecret } = response.data;

      // 2. Initialize the payment process (pass clientSecret to Stripe)
      await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Your App",
      });

      // 3. Present Payment Sheet
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert("Erro", error.message);
      } else {
        // 4. If payment succeeds, create inscription
        const inscriptionResponse = await api.post("/inscriptions/create", {
          userId,
          eventId: event.id,
          amount: event.priceEvent * 100,
        });

        console.log("Inscrição criada com sucesso:", inscriptionResponse.data);

        Alert.alert("Sucesso", "Inscrição confirmada!");
      }
    } catch (error) {
      console.error("Erro ao processar inscrição/pagamento:", error);
      Alert.alert("Erro", "Houve um problema ao processar o pagamento.");
    }
  };

  if (!event) {
    return (
      <S.Container>
        <S.EventText>Nenhum evento selecionado</S.EventText>
      </S.Container>
    );
  }

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

          <S.CloseModal onPress={() => handleEventPress()}>
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
                  <S.SignupEvent onPress={() => handleInscription()}>
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
        </>
      )}
    </S.Container>
  );
}
