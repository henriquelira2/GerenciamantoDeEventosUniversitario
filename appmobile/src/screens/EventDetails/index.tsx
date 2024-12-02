/* eslint-disable prettier/prettier */
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import { PaymentWebView } from "../../components/PaymentWebView";
import { api } from "../../services/api";

type Event = {
  id: string;
  nameEvent: string;
  locationEvent: string;
  dateEventStart: string;
  dateEventEnd: string;
  hourEventStart: string;
  hourEventEnd: string;
  priceEvent: number;
  descriptionEvent: string;
  durationEvent: string;
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
  const [refreshing, setRefreshing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  useEffect(() => {
    if (route.params?.event) {
      setEvent(route.params.event);
    }
  }, [route.params?.event]);

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

  const handleFreeEventInscription = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/inscriptions/createFreeEventInscription",
        {
          userId,
          // @ts-ignore
          eventId: event.id,
        }
      );

      if (response.status === 200) {
        setFeedbackMessage("Inscrição realizada com sucesso!");
      } else if (response.status === 408) {
        setFeedbackMessage("Você já está inscrito neste evento.");
      } else {
        setFeedbackMessage("Erro ao realizar a inscrição.");
      }
    } catch (error) {
      console.error("Erro ao inscrever-se no evento gratuito:", error);
      //@ts-ignore
      if (error.response && error.response.status === 408) {
        setFeedbackMessage("Você já está inscrito neste evento.");
      } else {
        setFeedbackMessage("Houve um problema ao processar a inscrição.");
      }
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
      setFeedbackModalVisible(true);
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
        showMessage({
          message: "Erro",
          description: "Link de pagamento não disponível.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Erro1 : ", error);

      if (error instanceof Error && (error as any).response) {
        const axiosError = error as any;

        if (axiosError.response.status === 408) {
          alert("Você já está inscrito neste evento.");
        } else if (axiosError.response.status === 409) {
          alert("Evento Esgotado.");
        } else {
          alert("Houve um problema ao processar o pagamento.");
        }
      } else {
        alert("Houve um problema ao se conectar ao servidor.");
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
      text: "De "+event.hourEventStart.split(":").slice(0, 2).join(":") + " até "+  event.hourEventEnd.split(":").slice(0, 2).join(":") + " - " + event.durationEvent + "h",
    },
    {
      key: "price",
      icon: "sell",
      //@ts-ignore
      text: event.priceEvent === "0" ? "Grátis" : `${event.priceEvent}`,
    },
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
      <S.BoxContainer>
        <FlashMessage position="top" />
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
                    {
                      //@ts-ignore
                      event.priceEvent === "0" ? (
                        <S.BtnBox>
                          <S.SignupEvent
                            onPress={() => setShowConfirmModal(true)}
                          >
                            <S.SignupEventText>
                              Participar do Evento
                            </S.SignupEventText>
                          </S.SignupEvent>
                        </S.BtnBox>
                      ) : (
                        <S.BtnBox>
                          <S.SignupEvent onPress={handleInscription}>
                            <S.SignupEventText>
                              Participar do Evento
                            </S.SignupEventText>
                          </S.SignupEvent>
                        </S.BtnBox>
                      )
                    }
                  </>
                )}
              />
            </S.Bot>
            <S.CloseModal onPress={handleEventPress}>
              <AntDesign name="left" size={20} color="white" />
            </S.CloseModal>
          </>
        )}
        <PaymentWebView
          visible={showPaymentModal}
          paymentLink={paymentLink}
          onClose={() => setShowPaymentModal(false)}
        />

        {/*Modal de Confirmação de Compra/Inscrição */}
        <S.Modal
          visible={showConfirmModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowConfirmModal(false)}
        >
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalText>
                Deseja realmente participar deste evento gratuito?
              </S.ModalText>
              <S.ModalButtonContainer>
                <S.ModalButton
                  onPress={handleFreeEventInscription}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <S.ModalButtonText>Sim</S.ModalButtonText>
                  )}
                </S.ModalButton>
                <S.ModalButton onPress={() => setShowConfirmModal(false)}>
                  <S.ModalButtonText>Não</S.ModalButtonText>
                </S.ModalButton>
              </S.ModalButtonContainer>
            </S.ModalContent>
          </S.ModalContainer>
        </S.Modal>

        {/*Modal de Feedback */}
        <S.Modal
          visible={feedbackModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setFeedbackModalVisible(false)}
        >
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalText>{feedbackMessage}</S.ModalText>
              <S.ModalButtonContainer>
                <S.ModalButton onPress={() => setFeedbackModalVisible(false)}>
                  <S.ModalButtonText>Ok</S.ModalButtonText>
                </S.ModalButton>
              </S.ModalButtonContainer>
            </S.ModalContent>
          </S.ModalContainer>
        </S.Modal>
        
      </S.BoxContainer>
    </S.Container>
  );
}
