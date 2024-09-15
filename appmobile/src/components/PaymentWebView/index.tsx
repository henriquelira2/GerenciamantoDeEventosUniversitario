/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, ActivityIndicator, Alert } from "react-native";
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
    console.log("url2" + url);
    if (url.includes("https://pagamento.sandbox.pagbank.com.br/conclusao")) {//mudar link 
      onClose();
      navigation.navigate("Eventos");
    } else if (url.includes("https://eventmaneger.com/failure")) {//mudar link 
      onClose();
      navigation.navigate("Home");
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <S.Container>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

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
      </S.Container>
    </Modal>
  );
}
