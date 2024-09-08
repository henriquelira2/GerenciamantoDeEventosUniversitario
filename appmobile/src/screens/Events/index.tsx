import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Importe o useNavigation
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

import * as S from "./styles";
import { Event } from "../../configs/types";
import { AuthNavigatorRoutesProps } from "../../routes/app.route.stack";
import { api } from "../../services/api";

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
    fetchEvents();
  }, []);

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

  const renderEvent = ({ item }: { item: Event }) => {
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
                  {item.locationEvent} - {item.hourEvent} - {item.id}
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
    </S.Container>
  );
}
