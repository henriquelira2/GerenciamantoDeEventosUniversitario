import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Button, View, Alert } from "react-native";

import { api } from "../../services/api";

export function Payment({ route }) {
  const { inscriptionId, eventImage, eventName, eventPrice } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await api.post("/payments/create-payment-intent", {
      amount: parseInt(eventPrice, 10) * 100, // O valor deve ser enviado em centavos
      currency: "brl",
    });
    const { clientSecret } = response.data;
    return {
      clientSecret,
    };
  };

  const initializePaymentSheet = async () => {
    const { clientSecret } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Seu Nome ou Empresa",
    });
    if (error) {
      console.log("Erro ao inicializar Payment Sheet:", error);
      Alert.alert("Erro", "Não foi possível iniciar o pagamento.");
    }
  };

  useEffect(() => {
    console.log(inscriptionId);
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    setLoading(true);
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Erro`, error.message);
    } else {
      Alert.alert("Sucesso", "Seu pagamento foi confirmado!");

      try {
        const response = await api.post("/payments/verify", {
          inscriptionId,
        });

        if (response.data.success) {
          Alert.alert("Sucesso", response.data.message);
        } else {
          Alert.alert("Erro", response.data.message);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        Alert.alert("Erro", "Não foi possível verificar o pagamento.");
      }
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button disabled={loading} title="Pagar" onPress={openPaymentSheet} />
    </View>
  );
}
