import { showMessage } from "react-native-flash-message";
import { useMutation, UseMutateAsyncFunction } from "react-query";

import { CreateEvent } from "../requests";
import { CreateEventT } from "../types";

type UseCreateEventProps = {
  CreateEventMutation: UseMutateAsyncFunction<
    void,
    unknown,
    CreateEventT,
    unknown
  >;
  CreateEventLoading: boolean;
};

export const useCreateEvent = (): UseCreateEventProps => {
  const { mutateAsync: CreateEventMutation, isLoading: CreateEventLoading } =
    useMutation({
      mutationFn: CreateEvent,
      onError: () => {
        console.log("Error: Failed to create event");
        showMessage({
          message: "Erro",
          description: "Houve um erro ao Criar o evento!",
          type: "danger",
          duration: 3000,
        });
      },
      onSuccess: () => {
        console.log("Success: Event created!");
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
