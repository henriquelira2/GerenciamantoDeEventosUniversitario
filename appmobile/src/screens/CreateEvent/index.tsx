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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import FlashMessage from "react-native-flash-message";

import * as S from "./styles";
import { useCreateEvent } from "../../configs/hooks/useFunctionEvents";
import { Event } from "../../configs/types";
import { CreateEventSchema } from "../../schemas";
import { api } from "../../services/api";
import theme from "../../theme";

export function CreateEvent() {
  const [loadingButton, setLoadingButton] = useState(false);

  // Date Time Picker
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
  } = useForm<Event | any>({
    mode: "onSubmit",
    resolver: yupResolver(CreateEventSchema),
  });

  const { CreateEventMutation, CreateEventLoading } = useCreateEvent();

  const submitCreatEventForm = async (data: Event) => {
    const hourEvent = new Date(data.hourEvent)
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
      hourEvent,
      priceEvent: data.priceEvent,
      organizerEvent: data.organizerEvent,
      qtdVacanciesEvent: data.qtdVacanciesEvent,
      imageEvent: data.imageEvent,
      locationEvent: data.locationEvent,
      typeEvent: data.typeEvent,
      id: undefined,
    });
    setLoadingButton(false);
  };

  return (
    <S.Container>
      <FlashMessage position="top" />
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

        {errors.dateEvent && (
          <S.TextErro>{errors.dateEvent.message}</S.TextErro>
        )}

        <S.Input>
          <Controller
            control={control}
            name="dateEvent"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowPicker(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Data do Evento"
                  value={value ? value.toLocaleDateString("pt-BR") : ""}
                />
                <Feather
                  name="calendar"
                  size={26}
                  color="black"
                  style={{ position: "absolute", left: 10, top: 12 }}
                />
                {showPicker && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    is24Hour
                    onChange={(event, selectedDate) => {
                      setShowPicker(false);
                      if (selectedDate) {
                        console.log(selectedDate);
                        onChange(selectedDate);
                      }
                    }}
                  />
                )}
              </S.TextInputDateTime>
            )}
          />
        </S.Input>

        {errors.hourEvent && (
          <S.TextErro>{errors.hourEvent.message}</S.TextErro>
        )}
        <S.Input>
          <Controller
            control={control}
            name="hourEvent"
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <S.TextInputDateTime onPress={() => setShowTimePicker(true)}>
                <S.placeholderDateTime
                  editable={false}
                  placeholder="Hora do Evento"
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
                {showTimePicker && (
                  <DateTimePicker
                    value={value || new Date()}
                    mode="time"
                    display="default"
                    is24Hour
                    onChange={(event, selectedTime) => {
                      setShowTimePicker(false);
                      if (selectedTime) {
                        onChange(selectedTime);
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
                  backgroundColor: theme.COLORS.GRAY100,
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
