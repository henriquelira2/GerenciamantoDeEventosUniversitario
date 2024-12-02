/* eslint-disable prettier/prettier */

import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { EventUpdateSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

type EditEventModalProps = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onRefresh: () => void;
};

type Event = {
  id: string;
  nameEvent: string;
  imageEvent: string;
  locationEvent: string;
  dateEventStart: string;
  dateEventEnd: string;
  hourEventStart: string;
  hourEventEnd: string;
  organizerEvent: string;
  durationEvent: string;
  qtdVacanciesEvent: number;
  priceEvent: number;
  descriptionEvent: string;
  typeEvent: string;
};

export const EditEventModal: React.FC<EditEventModalProps> = ({
  visible,
  event,
  onClose,
  onRefresh,
}) => {
  const [name] = useState(event?.nameEvent || "");
  const [imageEvent] = useState(event?.imageEvent || "");
  const [location] = useState(event?.locationEvent || "");
  const [date] = useState(event?.dateEventStart || "");
  const [dateEnd] = useState(event?.dateEventEnd || "");
  const [hour] = useState(event?.hourEventStart || "");
  const [hourEnd] = useState(event?.hourEventEnd || "");
  const [organizer] = useState(event?.organizerEvent || "");
  const [qtdVacancies] = useState(event?.qtdVacanciesEvent || "");
  const [price] = useState(event?.priceEvent.toString() || "");
  const [description] = useState(event?.descriptionEvent || "");
  const [typeEvent] = useState(event?.typeEvent || "");
  const [durationEvent] = useState(event?.durationEvent || "");

  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);
  const [image, setImage] = useState<string | null>(
    `${api.defaults.baseURL}/${imageEvent}`
  );

  const pickImage = async (onChange: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);

      const formData = new FormData();
      formData.append("name", "eventImage");
      // @ts-ignore
      formData.append("file", {
        uri: selectedImage,
        type: "image/jpeg",
        name: selectedImage.split("/").pop(),
      });

      try {
        const response = await api.post("/pictures/imagem", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && response.data.picture) {
          onChange(response.data.picture.src);
        } else {
          console.error("Falha ao carregar a imagem:", response.data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar a imagem:", error);
      }
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Event | any>({
    mode: "onSubmit",
    resolver: yupResolver(EventUpdateSchema),
  });

  useEffect(() => {
    if (event) {
      reset({
        nameEvent: event.nameEvent,
        imageEvent: event.imageEvent,
        locationEvent: event.locationEvent,
        dateEventStart: event.dateEventStart,
        dateEventEnd: event.dateEventEnd,
        hourEventStart: event.hourEventStart,
        hourEventEnd: event.hourEventEnd,
        organizerEvent: event.organizerEvent,
        qtdVacanciesEvent: event.qtdVacanciesEvent,
        priceEvent: event.priceEvent,
        descriptionEvent: event.descriptionEvent,
        typeEvent: event.typeEvent,
        durationEvent: event.durationEvent,
      });
      setImage(`${api.defaults.baseURL}/${event.imageEvent}`);
    }
  }, [event, reset]);

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateEvent = async (data: Event) => {
    try {
      setIsLoading(true);

      const updatedEvent = {
        ...event,
        ...data,
      };

      // @ts-ignore
      await api.put(`/events/update/${event?.id}`, updatedEvent);

      showMessage({
        message: "Evento atualizado com sucesso",
        type: "success",
      });
      setTimeout(() => {
        onClose();
        onRefresh();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      showMessage({
        message: "Erro ao atualizar Evento",
        type: "danger",
      });
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <S.Modal>
        <S.Topo />

        <S.Bot source={bacground}>
          <S.ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          >
            <S.Title> Editar Evento</S.Title>

            <S.PreviwImage>
              <S.BannerEvent source={{ uri: image }} />
            </S.PreviwImage>

            {errors.imageEvent && (
              <S.TextErro>{errors.imageEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="imageEvent"
                render={({ field: { onChange, value } }) => (
                  <>
                    <S.btnImage onPress={() => pickImage(onChange)}>
                      <S.TextButtom>Select Image</S.TextButtom>
                    </S.btnImage>
                    <S.TextInputImage
                      placeholder="Selecione uma Imagem"
                      editable={false}
                      selectTextOnFocus={false}
                      value={value}
                      onChangeText={(text: any) => onChange(text)}
                    />
                  </>
                )}
              />
            </S.Input>

            {errors.nameEvent && (
              <S.TextErro>{errors.nameEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="nameEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    placeholder="Nome do Evento"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <MaterialIcons
                name="event"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            {errors.descriptionEvent && (
              <S.TextErro>{errors.descriptionEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="descriptionEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    style={{
                      height: 70,
                      textAlignVertical: "top",
                      paddingTop: 2,
                    }}
                    multiline
                    numberOfLines={4}
                    placeholder="Descrição do Evento"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <AntDesign
                name="filetext1"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 16 }}
              />
            </S.Input>

            {errors.locationEvent && (
              <S.TextErro>{errors.locationEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="locationEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    placeholder="Local do evento"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <MaterialIcons
                name="share-location"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            <S.Input>
              <Controller
                control={control}
                name="dateEventStart"
                render={({ field: { onChange, value } }) => {
                  const selectedDateStart =
                    value instanceof Date ? value : new Date(value);

                  return (
                    <S.TextInputDateTime
                      onPress={() => setShowDatePickerStart(true)}
                    >
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Data Inicial do Evento"
                        value={selectedDateStart.toLocaleDateString("pt-BR")}
                      />
                      <Feather
                        name="calendar"
                        size={26}
                        color="black"
                        style={{ position: "absolute", left: 10, top: 12 }}
                      />
                      {showDatePickerStart && (
                        <DateTimePicker
                          value={selectedDateStart}
                          mode="date"
                          display="default"
                          is24Hour
                          onChange={(event, selectedDateStart) => {
                            setShowDatePickerStart(false);
                            if (selectedDateStart) {
                              onChange(selectedDateStart.toISOString());
                            }
                          }}
                        />
                      )}
                    </S.TextInputDateTime>
                  );
                }}
              />
            </S.Input>

            <S.Input>
              <Controller
                control={control}
                name="dateEventEnd"
                render={({ field: { onChange, value } }) => {
                  const selectedDateEnd =
                    value instanceof Date ? value : new Date(value);

                  return (
                    <S.TextInputDateTime
                      onPress={() => setShowDatePickerEnd(true)}
                    >
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Data Final do Evento"
                        value={selectedDateEnd.toLocaleDateString("pt-BR")}
                      />
                      <Entypo
                        name="calendar"
                        size={26}
                        color="black"
                        style={{ position: "absolute", left: 10, top: 12 }}
                      />
                      {showDatePickerEnd && (
                        <DateTimePicker
                          value={selectedDateEnd}
                          mode="date"
                          display="default"
                          is24Hour
                          onChange={(event, selectedDateEnd) => {
                            setShowDatePickerEnd(false);
                            if (selectedDateEnd) {
                              onChange(selectedDateEnd.toISOString());
                            }
                          }}
                        />
                      )}
                    </S.TextInputDateTime>
                  );
                }}
              />
            </S.Input>

            <S.Input>
              <Controller
                control={control}
                name="hourEventStart"
                render={({ field: { onChange, value } }) => {
                  const selectedTimeStart =
                    typeof value === "string" &&
                    /^\d{2}:\d{2}:\d{2}$/.test(value)
                      ? new Date(`1970-01-01T${value}`)
                      : value instanceof Date
                        ? value
                        : new Date();

                  return (
                    <S.TextInputDateTime
                      onPress={() => setShowTimePickerStart(true)}
                    >
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Hora do Evento"
                        value={
                          selectedTimeStart
                            ? selectedTimeStart.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              })
                            : ""
                        }
                      />
                      <Feather
                        name="clock"
                        size={26}
                        color="black"
                        style={{ position: "absolute", left: 10, top: 12 }}
                      />
                      {showTimePickerStart && (
                        <DateTimePicker
                          value={selectedTimeStart}
                          mode="time"
                          display="default"
                          is24Hour
                          onChange={(event, selectedTimeStart) => {
                            setShowTimePickerStart(false);
                            if (selectedTimeStart) {
                              const formattedTimeStart =
                                selectedTimeStart.toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                });
                              onChange(formattedTimeStart);
                            }
                          }}
                        />
                      )}
                    </S.TextInputDateTime>
                  );
                }}
              />
            </S.Input>

            <S.Input>
              <Controller
                control={control}
                name="hourEventEnd"
                render={({ field: { onChange, value } }) => {
                  const selectedTimeEnd =
                    typeof value === "string" &&
                    /^\d{2}:\d{2}:\d{2}$/.test(value)
                      ? new Date(`1970-01-01T${value}`)
                      : value instanceof Date
                        ? value
                        : new Date();

                  return (
                    <S.TextInputDateTime
                      onPress={() => setShowTimePickerEnd(true)}
                    >
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Hora de Término do Evento"
                        value={
                          selectedTimeEnd
                            ? selectedTimeEnd.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              })
                            : ""
                        }
                      />
                      <Entypo
                        name="time-slot"
                        size={26}
                        color="black"
                        style={{ position: "absolute", left: 10, top: 12 }}
                      />
                      {showTimePickerEnd && (
                        <DateTimePicker
                          value={selectedTimeEnd}
                          mode="time"
                          display="default"
                          is24Hour
                          onChange={(event, selectedTimeEnd) => {
                            setShowTimePickerEnd(false);
                            if (selectedTimeEnd) {
                              const formattedTimeEnd =
                                selectedTimeEnd.toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                });
                              onChange(formattedTimeEnd);
                            }
                          }}
                        />
                      )}
                    </S.TextInputDateTime>
                  );
                }}
              />
            </S.Input>

            {errors.organizerEvent && (
              <S.TextErro>{errors.organizerEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="organizerEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    placeholder="Organizador do Evento"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <MaterialIcons
                name="group"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            {errors.qtdVacanciesEvent && (
              <S.TextErro>{errors.qtdVacanciesEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="qtdVacanciesEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    placeholder="Quantidade de Vagas"
                    value={String(value)}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              <MaterialIcons
                name="event-seat"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            {errors.durationEvent && (
              <S.TextErro>{errors.durationEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="durationEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInput
                    placeholder="Duração do Evento"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              <MaterialCommunityIcons
                name="av-timer"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            {errors.priceEvent && (
              <S.TextErro>{errors.priceEvent.message}</S.TextErro>
            )}
            <S.Input>
              <Controller
                control={control}
                name="priceEvent"
                render={({ field: { onChange, value } }) => (
                  <CurrencyInput
                    value={value}
                    onChangeValue={onChange}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    style={{
                      width: "80%",
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 50,
                      backgroundColor: theme.COLORS.GRAY100,
                    }}
                  />
                )}
              />
              <Ionicons
                name="pricetag"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            <S.Input>
              <Controller
                control={control}
                name="typeEvent"
                render={({ field: { onChange, value } }) => (
                  <S.TextInputSelect>
                    <Picker selectedValue={value} onValueChange={onChange}>
                      <Picker.Item
                        label={typeEvent}
                        value={typeEvent}
                        style={{ color: "black" }}
                      />

                      <Picker.Item label="Minicurso" value="Minicurso" />
                      <Picker.Item label="Palestra" value="Palestra" />
                      <Picker.Item label="Workshops" value="Workshops" />
                      <Picker.Item label="Conferências" value="Conferências" />
                      <Picker.Item
                        label="Feiras Acadêmicas"
                        value="Feiras Acadêmicas"
                      />
                      <Picker.Item label="Seminário" value="Seminário" />
                      <Picker.Item
                        label="Semana de Humanismo e Cidadania"
                        value="Semana de Humanismo e Cidadania"
                      />
                      <Picker.Item
                        label="Semana da Computação"
                        value="Semana da Computação"
                      />
                    </Picker>
                  </S.TextInputSelect>
                )}
              />
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={26}
                color="black"
                style={{ position: "absolute", left: 10, top: 12 }}
              />
            </S.Input>

            <S.UpdateButtom onPress={handleSubmit(onUpdateEvent)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <S.TextButtomUpdate>Editar Evento</S.TextButtomUpdate>
              )}
            </S.UpdateButtom>
            <S.CloseModal onPress={onClose}>
              <AntDesign name="close" size={30} color="black" />
            </S.CloseModal>
          </S.ScrollView>
        </S.Bot>
      </S.Modal>
    </Modal>
  );
};
