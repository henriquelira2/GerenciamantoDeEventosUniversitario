import { showMessage } from "react-native-flash-message";
import { useMutation, UseMutateAsyncFunction } from "react-query";

import { CreateEvent } from "../requests";
import { Event } from "../types";

type UseCreateEventProps = {
  CreateEventMutation: UseMutateAsyncFunction<void, unknown, Event, unknown>;
  CreateEventLoading: boolean;
};

export const useCreateEvent = (): UseCreateEventProps => {
  const { mutateAsync: CreateEventMutation, isLoading: CreateEventLoading } =
    useMutation({
      mutationFn: CreateEvent,
      onError: () => {
        console.log("Erro: Falha ao criar evento");
        showMessage({
          message: "Erro",
          description: "Houve um erro ao Criar o evento!",
          type: "danger",
          duration: 3000,
        });
      },
      onSuccess: () => {
        console.log("Sucesso: Evento criado!");
        showMessage({
          message: "Sucesso",
          description: "Evento criado com sucesso!",
          type: "success",
          duration: 3000,
        });
      },
    });

  return { CreateEventMutation, CreateEventLoading };
};
