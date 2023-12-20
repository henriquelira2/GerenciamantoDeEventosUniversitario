import { useContext } from "react";
import { Alert } from "react-native";
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
      Alert.alert("erro");
    },
    onSuccess: () => {
      Alert.alert("sucess");
      setUser(true);
    },
  });

  return { loginMutation, loginLoading };
};
