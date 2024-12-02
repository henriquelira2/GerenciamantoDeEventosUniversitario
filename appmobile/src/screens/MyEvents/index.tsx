/* eslint-disable prettier/prettier */
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { CheckinQrcode } from "../../components/CheckinQrcode";
import { Event } from "../../configs/types";
import { api } from "../../services/api";

export function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); 
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCredentialCode, setSelectedCredentialCode] = useState<
    string | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

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
    const formattedDate = format(new Date(item.event.dateEventStart), "dd/MM/yyyy");

    return (
      <S.BoxEvent onPress={() => handleEventPress(item)}>
        {imageUri ? (
          <>
            <S.ImageEvent
              source={{
                uri: imageUri,
              }}
              style={{
                resizeMode: "stretch",
              }}
            />
            <S.BoxInfo>
              <S.Info1>
                <S.TitleEvent numberOfLines={2} ellipsizeMode="tail">
                  {item.event.nameEvent}
                </S.TitleEvent>
                <S.Location>
                  <Entypo
                    name="location-pin"
                    size={14}
                    color="gray"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  />
                  {item.event.locationEvent}
                </S.Location>
                <S.DateHour>
                  <S.Hour>
                    <Entypo
                      name="clock"
                      size={14}
                      color="gray"
                      style={{ letterSpacing: 10 }}
                    />
                    {item.event.hourEventStart}
                  </S.Hour>
                  <S.Date>
                    <Entypo
                      name="calendar"
                      size={14}
                      color="gray"
                      style={{ letterSpacing: 10 }}
                    />
                    {formattedDate}
                  </S.Date>
                </S.DateHour>
              </S.Info1>
              <S.Info2>
                {item.event.priceEvent === "0" ? (
                  <S.Price>Gratis</S.Price>
                ) : (
                  <S.Price>${item.event.priceEvent}</S.Price>
                )}
              </S.Info2>
            </S.BoxInfo>
          </>
        ) : (
          <Text>No Image Available</Text>
        )}
      </S.BoxEvent>
    );
  };

  return (
    <S.Container source={bacground}>
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
      ) : filteredEvents.length === 0 ? (
        <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
          Nenhum evento inscrito no momento.
        </Text>
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
