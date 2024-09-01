import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import * as S from "./styles";
import { api } from "../../services/api";

type EventType = {
  id: number;
  nameEvent: string;
  descriptionEvent: string;
  dateEvent: string;
  hourEvent: string;
  priceEvent: string;
  organizerEvent: string;
  qtdVacanciesEvent: number;
  imageEvent: string;
  locationEvent: string;
  typeEvent: string;
};

export function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/events/all");
      setEvents(response.data);
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

  const handleEventPress = (event: EventType) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const renderEvent = ({ item }: { item: EventType }) => {
    const imageUri = item.imageEvent
      ? `${api.defaults.baseURL}/${item.imageEvent}`
      : null;

    return (
      <S.BoxEvent onPress={() => handleEventPress(item)}>
        {imageUri ? (
          <S.ImageEvent
            source={{
              uri: imageUri,
            }}
            imageStyle={{ borderRadius: 30 }}
          >
            <S.BoxInfo>
              <S.Info1>
                <S.TitleEvent>{item.nameEvent}</S.TitleEvent>
                <S.LocationHour>
                  {item.locationEvent} - {item.hourEvent}
                </S.LocationHour>
              </S.Info1>
              <S.Info2>
                <S.Price>${item.priceEvent}</S.Price>
              </S.Info2>
            </S.BoxInfo>
          </S.ImageEvent>
        ) : (
          <Text>No Image Available</Text>
        )}
      </S.BoxEvent>
    );
  };
  return (
    <S.Container>
      <S.Search>
        <S.InputSeach placeholder="Nome do Evento" />
        <MaterialIcons
          name="search"
          size={26}
          color="white"
          style={{ position: "absolute", left: 10, top: 12 }}
        />
      </S.Search>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <S.FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item: { id: { toString: () => any } }) =>
            item.id.toString()
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <S.ModalContainer>
          <S.ModalContent>
            {selectedEvent && (
              <>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {selectedEvent.nameEvent}
                </Text>
                <Text>{selectedEvent.descriptionEvent}</Text>
                <Text>Date: {selectedEvent.dateEvent}</Text>
                <Text>Time: {selectedEvent.hourEvent}</Text>
                <Text>Price: ${selectedEvent.priceEvent}</Text>
                <Text>Organizer: {selectedEvent.organizerEvent}</Text>
                <Text>Location: {selectedEvent.locationEvent}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "blue", marginTop: 20 }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </S.ModalContent>
        </S.ModalContainer>
      </Modal>
    </S.Container>
  );
}
