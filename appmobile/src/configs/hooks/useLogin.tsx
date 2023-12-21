import { useContext } from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation, UseMutateAsyncFunction } from "react-query";

import { AuthContext } from "../../contexts/auth";
import { LoginUser } from "../requests";
import { User } from "../types";

type UseLoginProps = {
  loginMutation: UseMutateAsyncFunction<void, unknown, User, unknown>;
  loginLoading: boolean;
};

export const useLogin = (): UseLoginProps => {
  const { setUser } = useContext(AuthContext);
  const { mutateAsync: loginMutation, isLoading: loginLoading } = useMutation({
    mutationFn: LoginUser,
    onError: () => {
      showMessage({
        message: "Erro",
        description: "Usuário ou senha incorretos!",
        type: "danger",
        duration: 3000,
      });
    },
    onSuccess: () => {
      showMessage({
        message: "Sucess",
        description: "Login bem sucedido!",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => setUser(true), 5000);
    },
  });

  return { loginMutation, loginLoading };
};
