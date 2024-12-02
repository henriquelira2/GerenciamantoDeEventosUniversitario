/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, ActivityIndicator, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { WebView } from "react-native-webview";

import * as S from "./styles";
import { AppBottomTabsRoutesProps } from "../../routes/app.route.bottomTabs";

interface PaymentWebViewProps {
  visible: boolean;
  paymentLink: string;
  onClose: () => void;
}

export function PaymentWebView({
  visible,
  paymentLink,
  onClose,
}: PaymentWebViewProps) {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<AppBottomTabsRoutesProps>();

  const handleNavigationChange = (navState: { url: any }) => {
    const { url } = navState;
    console.log("URL - " + url);
    if (url.includes("https://pagamento.sandbox.pagbank.com.br/conclusao")) {
      onClose();
      showMessage({
        message: "Pagamento realizado com sucesso",
        type: "success",
      });

      setTimeout(() => {
        navigation.navigate("PaymentSucess");
      }, 1000);
    } else if (url.includes("https://eventmaneger.com/failure")) {
      onClose();
      navigation.navigate("PaymentErr");
    }
  };

  return (
    <>
      <FlashMessage position="top" />

      <Modal visible={visible} onRequestClose={onClose} animationType="slide">
        <S.Container>
          <WebView
            source={{ uri: paymentLink }}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              Alert.alert(
                "Erro",
                "Não foi possível carregar a página de pagamento."
              );
              onClose();
            }}
            onNavigationStateChange={handleNavigationChange}
          />
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </S.Container>
      </Modal>
    </>
  );
}
