import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  useMutation,
  UseMutateAsyncFunction,
  UseQueryOptions,
  useQuery,
} from "react-query";

import { CreateUser, GetUser, UpdateUser } from "../requests";
import { RegisterUser } from "../types";

type UseCreateUserProps = {
  createUserMutation: UseMutateAsyncFunction<
    void,
    unknown,
    RegisterUser,
    unknown
  >;
  createUserLoading: boolean;
};

type UseUpdateUserProps = {
  updateUserMutation: UseMutateAsyncFunction<
    void,
    unknown,
    RegisterUser,
    unknown
  >;
  updateUserLoading: boolean;
};

type UseGetOrderDetailsProps = {
  config?: UseQueryOptions<void, unknown, RegisterUser, ["user-infos", string]>;
  cpf: string;
};

export const useCreateUser = (): UseCreateUserProps => {
  const { mutateAsync: createUserMutation, isLoading: createUserLoading } =
    useMutation({
      mutationFn: CreateUser,
      onError: () => {
        showMessage({
          message: "Erro",
          description: "Houve um erro ao cadastrar o usuário !",
          type: "danger",
          duration: 3000,
        });
      },
      onSuccess: () => {
        showMessage({
          message: "Sucess",
          description: "Usuário criado com sucesso!",
          type: "success",
          duration: 3000,
        });
      },
    });

  return { createUserMutation, createUserLoading };
};

export const useUpdateUser = (): UseUpdateUserProps => {
  const { mutateAsync: updateUserMutation, isLoading: updateUserLoading } =
    useMutation({
      mutationFn: UpdateUser,
      onError: () => {
        Alert.alert("erro");
      },
      onSuccess: () => {
        Alert.alert("sucess");
      },
    });

  return { updateUserMutation, updateUserLoading };
};

export const useGetUser = ({ config, cpf }: UseGetOrderDetailsProps) => {
  return useQuery(["user-infos", cpf], () => GetUser({ cpf }), config);
};
