/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import * as S from "./styles";
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
      const filtered = events.filter((event) => event.nameEvent.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUri = item.imageEvent
      ? `${api.defaults.baseURL}/${item.imageEvent}`
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
                <S.TitleEvent>{item.nameEvent}</S.TitleEvent>
                <S.LocationHour>
                  {item.locationEvent} - {item.hourEvent}
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
    </S.Container>
  );
}
