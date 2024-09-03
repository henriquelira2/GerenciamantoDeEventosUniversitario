/* eslint-disable react-hooks/rules-of-hooks */
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Modal } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import MaskInput from "react-native-mask-input";

import * as S from "./styles";
import { RegisterUser } from "../../configs/types";
import { AdmimUpdateUserSchema } from "../../schemas";
import { UserData } from "../../screens/UsersList";
import { api } from "../../services/api";

interface EditModalProps {
  isVisible: boolean;
  user: UserData | null;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isVisible, user, onClose }) => {
  if (!user) {
    return null;
  }

  // eslint-disable-next-line prettier/prettier
  const CPF_MASK = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];
  // eslint-disable-next-line prettier/prettier
  const PHONE_MASK = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUser | any>({
    mode: "onSubmit",
    resolver: yupResolver(AdmimUpdateUserSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const onUpdateUser = async (data: RegisterUser) => {
    try {
      setIsLoading(true);

      const updatedUserData = {
        ...user,
        ...data,
      };

      await api.put(`/users/update2/${user?.cpf}`, updatedUserData);

      showMessage({
        message: "Usuário atualizado com sucesso",
        type: "success",
      });

      // Adicione um delay de 1 segundo antes de fechar o modal
      setTimeout(() => {
        onClose();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      showMessage({
        message: "Erro ao atualizar usuário",
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
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.Modal>
        <S.Topo>
          <S.Title>EDITAR USUARIO</S.Title>
          <S.Closer onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </S.Closer>
        </S.Topo>

        <S.box>
          <FlashMessage position="top" />
          <S.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {errors.firstName && (
              <S.TextErro>{errors.firstName.message}</S.TextErro>
            )}
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>NOME</S.TextUser>
                  <S.Input
                    placeholder={user?.firstName}
                    value={value}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
            {errors.lastName && (
              <S.TextErro>{errors.lastName.message}</S.TextErro>
            )}
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>SOBRENOME</S.TextUser>
                  <S.Input
                    placeholder={user?.lastName}
                    value={value}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
            {errors.cpf && <S.TextErro>{errors.cpf.message}</S.TextErro>}
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>CPF</S.TextUser>
                  <MaskInput
                    style={{
                      width: "90%",
                      fontSize: 18,
                      padding: 2,
                      marginBottom: 20,
                      marginLeft: "5%",
                      borderBottomWidth: 2,
                    }}
                    placeholder={user?.cpf}
                    mask={CPF_MASK}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(masked, unmasked) => {
                      onChange(unmasked);
                    }}
                  />
                </>
              )}
            />
            {errors.phoneNumber && (
              <S.TextErro>{errors.phoneNumber.message}</S.TextErro>
            )}
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>TELEFONE</S.TextUser>
                  <MaskInput
                    style={{
                      width: "90%",
                      fontSize: 18,
                      padding: 2,
                      marginBottom: 20,
                      marginLeft: "5%",
                      borderBottomWidth: 2,
                    }}
                    placeholder={user?.phoneNumber}
                    keyboardType="numeric"
                    mask={PHONE_MASK}
                    value={value}
                    onChangeText={(masked, unmasked) => {
                      onChange(unmasked);
                    }}
                  />
                </>
              )}
            />
            {errors.email && <S.TextErro>{errors.email.message}</S.TextErro>}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>EMAIL</S.TextUser>
                  <S.Input
                    placeholder={user?.email}
                    value={value}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
            {errors.password && (
              <S.TextErro>{errors.password.message}</S.TextErro>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>SENHA</S.TextUser>
                  <S.Input
                    placeholder="**********"
                    value={value}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
            {errors.type && <S.TextErro>{errors.type.message}</S.TextErro>}
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <S.TextUser>TIPO</S.TextUser>
                  <S.Input
                    placeholder="User/Admin/Manager"
                    value={value}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
            <S.TouchableOpacity onPress={handleSubmit(onUpdateUser)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <S.TextButtom>SALVAR</S.TextButtom>
              )}
            </S.TouchableOpacity>
          </S.ScrollView>
        </S.box>
      </S.Modal>
    </Modal>
  );
};

export default EditModal;
