/* eslint-disable prettier/prettier */
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { Event } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";

export function MyCreatedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const isFocused = useIsFocused();
  const route = useRoute();

  const fetchEvents = async () => {
    setLoading(true);
    const userCPF = await AsyncStorage.getItem("userCPF");
    try {
      const response = await api.get(`/events/organizer/${userCPF}`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEvents();
      //@ts-ignore
      const { message, type } = route.params || {};
      if (message && type) {
        handleDeleteEventMessage(message, type);
      }
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event: Event) => {
    // @ts-ignore
    navigation.navigate("EventDetailsMaster", { event });
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredEvents(events);
    } else {
      // @ts-ignore
      const filtered = events.filter((event) =>  event.nameEvent.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleDeleteEventMessage = (
    message: string,
    type: "success" | "danger"
  ) => {
    showMessage({
      message,
      type,
    });
    fetchEvents();
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUri = item.imageEvent
      ? `${api.defaults.baseURL}/${item.imageEvent}`
      : null;
    const formattedDate = format(new Date(item.dateEvent), "dd/MM/yyyy");

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
                  {item.nameEvent}
                </S.TitleEvent>
                <S.Location>
                  <Entypo
                    name="location-pin"
                    size={14}
                    color="gray"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  />
                  {item.locationEvent}
                </S.Location>
                <S.DateHour>
                  <S.Hour>
                    <Entypo
                      name="clock"
                      size={14}
                      color="gray"
                      style={{ letterSpacing: 10 }}
                    />
                    {item.hourEvent}
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
                {item.priceEvent === "0" ? (
                  <S.Price>Gratis</S.Price>
                ) : (
                  <S.Price>${item.priceEvent}</S.Price>
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
      <FlashMessage position="center" />
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
          Nenhum evento encontrado para este organizador.
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
    </S.Container>
  );
}
