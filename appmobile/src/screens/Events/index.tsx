/* eslint-disable prettier/prettier */
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { Event } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isFocused = useIsFocused();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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
      const response = await api.get("/events/all");
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
      fetchUserId();
      fetchEvents();
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event: Event) => {
    if (userId) {
      // @ts-ignore
      navigation.navigate("EventDetails", { event, userId });
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        //@ts-ignore
        event.nameEvent.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUri = item.imageEvent
      ? `${api.defaults.baseURL}/${item.imageEvent}`
      : null;
    const formattedDate = format(new Date(item.dateEventStart), "dd/MM/yyyy");

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
                    {item.hourEventStart}
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
          Nenhum evento encontrado
        </Text>
      ) : (
        <S.FlatList
          data={filteredEvents}
          renderItem={renderEvent}
          keyExtractor={(item: { id: { toString: () => any } }) =>
            item.id.toString()
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </S.Container>
  );
}
