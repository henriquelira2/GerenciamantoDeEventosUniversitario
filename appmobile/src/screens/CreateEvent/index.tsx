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
import { ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import FlashMessage from "react-native-flash-message";

import * as S from "./styles";
import bacground from "../../assets/bg-tela.png";
import { useCreateEvent } from "../../configs/hooks/useFunctionEvents";
import { Event } from "../../configs/types";
import { CreateEventSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

export function CreateEvent() {
  const [loadingButton, setLoadingButton] = useState(false);

  // Date Time Picker
  const [showPickerStart, setShowPickerStart] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);

  const [showTimePickerStart, setShowTimePickerStart] = useState(false);
  const [showTimePickerEnd, setShowTimePickerEnd] = useState(false);

  // ImagePicker
  const [image, setImage] = useState<string | null>(
    "https://via.placeholder.com/150"
  );

  const [users, setUsers] = useState([]); // Armazena os usuários
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/admin-managers");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const pickImage = async (onChange: {
    (...event: any[]): void;
    (arg0: string): void;
  }) => {
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
      //@ts-ignore
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
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Event | any>({
    mode: "onSubmit",
    resolver: yupResolver(CreateEventSchema),
  });

  const { CreateEventMutation, CreateEventLoading } = useCreateEvent();

  const submitCreatEventForm = async (data: Event) => {
    const hourEventEnd = new Date(data.hourEventEnd)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const hourEventStart = new Date(data.hourEventStart)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log("Form Data:", data);

    setLoadingButton(true);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    setLoadingButton(false);

    await CreateEventMutation({
      nameEvent: data.nameEvent,
      descriptionEvent: data.descriptionEvent,
      dateEvent: data.dateEvent,
      dateEventStart: data.dateEventStart,
      dateEventEnd: data.dateEventEnd,
      hourEventStart,
      hourEventEnd,
      priceEvent: data.priceEvent,
      organizerEvent: data.organizerEvent,
      qtdVacanciesEvent: data.qtdVacanciesEvent,
      imageEvent: data.imageEvent,
      locationEvent: data.locationEvent,
      durationEvent: data.durationEvent,
      typeEvent: data.typeEvent,
      id: undefined,
    });
    reset();
    setLoadingButton(false);
  };

  return (
    <S.Container source={bacground}>
      <FlashMessage position="center" />
      <S.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingTop: 20,
        }}
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
                  onChangeText={onChange}
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
                style={{ height: 70, textAlignVertical: "top", paddingTop: 15 }}
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

        {errors.dateEventStart && (
          <S.TextErro>{errors.dateEventStart.message}</S.TextErro>
        )}

        <S.Input>
          <Controller
            control={control}
            name="dateEventStart"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowPickerStart(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Data do Inicial do Evento"
                  value={value ? value.toLocaleDateString("pt-BR") : ""}
                />
                <Feather
                  name="calendar"
                  size={26}
                  color="black"
                  style={{ position: "absolute", left: 10, top: 12 }}
                />
                {showPickerStart && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    is24Hour
                    onChange={(event, selectedDateStart) => {
                      setShowPickerStart(false);
                      if (selectedDateStart) {
                        console.log("Data Inicial: " + selectedDateStart);
                        onChange(selectedDateStart);
                      }
                    }}
                  />
                )}
              </S.TextInputDateTime>
            )}
          />
        </S.Input>
        {errors.dateEventEnd && (
          <S.TextErro>{errors.dateEventEnd.message}</S.TextErro>
        )}

        <S.Input>
          <Controller
            control={control}
            name="dateEventEnd"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowPickerEnd(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Data do Final do Enveto"
                  value={value ? value.toLocaleDateString("pt-BR") : ""}
                />
                <Entypo
                  name="calendar"
                  size={26}
                  color="black"
                  style={{ position: "absolute", left: 10, top: 12 }}
                />
                {showPickerEnd && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    is24Hour
                    onChange={(event, selectedDateEnd) => {
                      setShowPickerEnd(false);
                      if (selectedDateEnd) {
                        console.log("data Final: " + selectedDateEnd);
                        onChange(selectedDateEnd);
                      }
                    }}
                  />
                )}
              </S.TextInputDateTime>
            )}
          />
        </S.Input>
        {errors.hourEventStart && (
          <S.TextErro>{errors.hourEventStart.message}</S.TextErro>
        )}
        <S.Input>
          <Controller
            control={control}
            name="hourEventStart"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowTimePickerStart(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Hora Inicial do Evento"
                  value={
                    value
                      ? value.toLocaleTimeString("pt-BR", {
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
                {showTimePickerStart && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="time"
                    display="default"
                    is24Hour
                    onChange={(event, selectedTimeStart) => {
                      setShowTimePickerStart(false);
                      if (selectedTimeStart) {
                        onChange(selectedTimeStart);
                      }
                    }}
                  />
                )}
              </S.TextInputDateTime>
            )}
          />
        </S.Input>
        {errors.hourEventEnd && (
          <S.TextErro>{errors.hourEventEnd.message}</S.TextErro>
        )}
        <S.Input>
          <Controller
            control={control}
            name="hourEventEnd"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowTimePickerEnd(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Hora Inicial do Evento"
                  value={
                    value
                      ? value.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
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
                    value={value || new Date()}
                    mode="time"
                    display="default"
                    is24Hour
                    onChange={(event, selectedTimeEnd) => {
                      setShowTimePickerEnd(false);
                      if (selectedTimeEnd) {
                        onChange(selectedTimeEnd);
                      }
                    }}
                  />
                )}
              </S.TextInputDateTime>
            )}
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
                placeholder="Quantidade de vagas pro evento"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          <MaterialCommunityIcons
            name="account-group-outline"
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
                style={{
                  width: "80%",
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 50,
                  backgroundColor: theme.COLORS.WHITE,
                }}
                value={value}
                onChangeValue={onChange}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                minValue={0}
                placeholder="Preço do evento"
                onChangeText={(formattedValue) => {
                  console.log(formattedValue);
                }}
              />
            )}
          />
          <Ionicons
            name="pricetags-outline"
            size={24}
            color="black"
            style={{ position: "absolute", left: 10, top: 12 }}
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
              <>
                {loadingUsers ? (
                  <ActivityIndicator />
                ) : (
                  <S.TextInputSelect>
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}
                    >
                      <Picker.Item
                        label="Selecione o organizador"
                        value=""
                        style={{ color: "gray" }}
                      />
                      {users.map((user) => (
                        <Picker.Item
                          //@ts-ignore
                          key={user.id}
                          //@ts-ignore
                          label={`${user.firstName} ${user.lastName}`}
                          //@ts-ignore
                          value={user.cpf}
                        />
                      ))}
                    </Picker>
                  </S.TextInputSelect>
                )}
              </>
            )}
          />
          <AntDesign
            name="user"
            size={26}
            color="black"
            style={{ position: "absolute", left: 10, top: 12 }}
          />
        </S.Input>
        {errors.typeEvent && (
          <S.TextErro>{errors.typeEvent.message}</S.TextErro>
        )}
        <S.Input>
          <Controller
            control={control}
            name="typeEvent"
            render={({ field: { onChange, value } }) => (
              <S.TextInputSelect>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => {
                    onChange(itemValue);
                  }}
                >
                  <Picker.Item
                    label="Tipo do evento"
                    value=""
                    style={{ color: "gray" }}
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

          <MaterialIcons
            name="list"
            size={26}
            color="black"
            style={{ position: "absolute", left: 10, top: 14 }}
          />
        </S.Input>

        <S.RegisterButtom
          onPress={handleSubmit((data) => {
            console.log("Formulário validado, dados:", data);
            submitCreatEventForm(data);
          })}
          isLoading={CreateEventLoading}
          disabled={CreateEventLoading}
        >
          <S.TextButtomRegister>
            {loadingButton ? <ActivityIndicator /> : "Criar Evento"}
          </S.TextButtomRegister>
        </S.RegisterButtom>
      </S.ScrollView>
    </S.Container>
  );
}
