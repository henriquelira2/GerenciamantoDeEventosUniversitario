/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import { EventUpdateSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

type EditEventModalProps = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onSave: (updatedEvent: Event) => void;
};

export const EditEventModal: React.FC<EditEventModalProps> = ({
  visible,
  event,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(event?.nameEvent || "");
  const [imageEvent, setImageEvent] = useState(event?.imageEvent || "");
  const [location, setLocation] = useState(event?.locationEvent || "");
  const [date, setDate] = useState(event?.dateEvent || "");
  const [time, setTime] = useState(event?.hourEvent || "");
  const [organizer, setOrganizer] = useState(event?.organizerEvent || "");
  const [qtdVacancies, setQtdVacancies] = useState(
    event?.qtdVacanciesEvent || ""
  );
  const [price, setPrice] = useState(event?.priceEvent.toString() || "");
  const [description, setDescription] = useState(event?.descriptionEvent || "");
  const [typeEvent, setTypeEvent] = useState(event?.typeEvent || "");

  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [image, setImage] = useState<string | null>(
    `${api.defaults.baseURL}/${imageEvent}`
  );

  const pickImage = async (onChange: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);

      const formData = new FormData();
      formData.append("name", "eventImage");
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
    setValue,
    formState: { errors },
  } = useForm<Event | any>({
    mode: "onSubmit",
    resolver: yupResolver(EventUpdateSchema),
    defaultValues: {
      nameEvent: name,
      imageEvent,
      locationEvent: location,
      dateEvent: date || "",
      hourEvent: time || "",
      organizerEvent: organizer || "",
      qtdVacanciesEvent: qtdVacancies || "",
      priceEvent: price || 0,
      descriptionEvent: description || "",
      typeEvent: typeEvent || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateEvent = async (data: Event) => {
    try {
      setIsLoading(true);

      const updatedEvent = {
        ...event,
        ...data,
      };

      await api.put(`/events/update/${event?.id}`, updatedEvent);

      showMessage({
        message: "Evento atualizado com sucesso",
        type: "success",
      });
      setTimeout(() => {
        onClose();
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
        <S.Topo>
          <S.Title>EDITAR EVENTO</S.Title>
          <S.Closer onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </S.Closer>
        </S.Topo>

        <S.box>
          <S.ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          >
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
                name="dateEvent"
                render={({ field: { onChange, value } }) => {
                  const selectedDate =
                    value instanceof Date ? value : new Date(value);

                  return (
                    <S.TextInputDateTime onPress={() => setShowPicker(true)}>
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Data do Evento"
                        value={selectedDate.toLocaleDateString("pt-BR")}
                      />
                      <Feather
                        name="calendar"
                        size={26}
                        color="black"
                        style={{ position: "absolute", left: 10, top: 12 }}
                      />
                      {showPicker && (
                        <DateTimePicker
                          value={selectedDate}
                          mode="date"
                          display="default"
                          is24Hour
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) {
                              onChange(selectedDate.toISOString());
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
                name="hourEvent"
                defaultValue={time}
                render={({ field: { onChange, value } }) => {
                  const selectedTime = time
                    ? typeof time === "string" &&
                      /^\d{2}:\d{2}:\d{2}$/.test(time)
                      ? new Date(`1970-01-01T${time}`)
                      : new Date(time)
                    : new Date();

                  return (
                    <S.TextInputDateTime
                      onPress={() => setShowTimePicker(true)}
                    >
                      <S.placeholderDateTime
                        editable={false}
                        placeholder="Hora do Evento"
                        value={
                          selectedTime
                            ? selectedTime.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
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
                      {showTimePicker && (
                        <DateTimePicker
                          value={selectedTime}
                          mode="time"
                          display="default"
                          is24Hour
                          onChange={(event, selectedTime) => {
                            setShowTimePicker(false);
                            if (selectedTime) {
                              const formattedTime =
                                selectedTime.toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                });
                              setTime(formattedTime);
                              onChange(formattedTime);
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
                      <Picker.Item
                        label="Eventos acadêmicos e educacionais"
                        value="Eventos acadêmicos e educacionais"
                      />
                      <Picker.Item
                        label="Eventos sociais"
                        value="Eventos sociais"
                      />
                      <Picker.Item
                        label="Eventos corporativos"
                        value="Eventos corporativos"
                      />
                      <Picker.Item
                        label="Eventos religiosos"
                        value="Eventos religiosos"
                      />
                      <Picker.Item
                        label="Eventos culturais e de entretenimento"
                        value="Eventos culturais e de entretenimento"
                      />
                      <Picker.Item
                        label="Eventos esportivos"
                        value="Eventos esportivos"
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
          </S.ScrollView>
        </S.box>
      </S.Modal>
    </Modal>
  );
};
