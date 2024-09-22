/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import * as S from "./styles";
import { CheckinQrcode } from "../../components/CheckinQrcode";
import { Event } from "../../configs/types";
import { api } from "../../services/api";

export function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); // Adicionado para eventos filtrados
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCredentialCode, setSelectedCredentialCode] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Adicionado para o termo de busca

  const isFocused = useIsFocused();

  const fetchUserId = async () => {
    const userCPF = await AsyncStorage.getItem("userCPF");
    if (userCPF) {
      try {
        const response = await api.get(`/users/${userCPF}`);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Erro ao buscar o ID do usuário:", error);
      }
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/events/confirmed/${userId}`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUserId();
    };

    initialize();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.event.nameEvent.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleEventPress = (event: Event) => {
    if (event.credential_code) {
      setSelectedCredentialCode(event.credential_code);
      setIsModalVisible(true);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUri = item.event.imageEvent
      ? `${api.defaults.baseURL}/${item.event.imageEvent}`
      : null;

    return (
      <S.BoxEvent onPress={() => handleEventPress(item)}>
        {imageUri ? (
          <S.ImageEvent
            source={{ uri: imageUri }}
            imageStyle={{ borderRadius: 30 }}
          >
            <S.BoxInfo>
              <S.Info1>
                <S.TitleEvent>{item.event.nameEvent}</S.TitleEvent>
                <S.LocationHour>
                  {item.event.locationEvent} - {item.event.hourEvent}
                </S.LocationHour>
              </S.Info1>
            </S.BoxInfo>
          </S.ImageEvent>
        ) : (
          <S.TitleEvent>Nenhuma imagem disponível</S.TitleEvent>
        )}
      </S.BoxEvent>
    );
  };

  return (
    <S.Container>
      <S.Search>
        <S.InputSeach
          placeholder="Nome do Evento"
          value={searchTerm}
          onChangeText={handleSearch}
        />
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
          data={filteredEvents}
          renderItem={renderEvent}
          //@ts-ignore
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <S.Modal visible={isModalVisible} transparent animationType="slide">
        <S.ModalContainer>
          <S.BoxModal>
            <CheckinQrcode credential_code={selectedCredentialCode || ""} />
            <S.BtnCloseModal onPress={() => setIsModalVisible(false)}>
              <S.TextBtnModal>Fechar</S.TextBtnModal>
            </S.BtnCloseModal>
          </S.BoxModal>
        </S.ModalContainer>
      </S.Modal>
    </S.Container>
  );
}
