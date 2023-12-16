import { Alert } from "react-native";
import { useMutation, UseMutateAsyncFunction } from "react-query";

import { LoginUser } from "../requests";
import { User } from "../types";

type UseLoginProps = {
  loginMutation: UseMutateAsyncFunction<void, unknown, User, unknown>;
  loginLoading: boolean;
};

export const useLogin = (): UseLoginProps => {
  const { mutateAsync: loginMutation, isLoading: loginLoading } = useMutation({
    mutationFn: LoginUser,
    onError: () => {
      Alert.alert("erro");
    },
    onSuccess: () => {
      Alert.alert("sucess");
    },
  });

  return { loginMutation, loginLoading };
};
