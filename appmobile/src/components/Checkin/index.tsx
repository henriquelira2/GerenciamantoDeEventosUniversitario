/* eslint-disable prettier/prettier */
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import * as S from "./styles";
import { api } from "../../services/api";

type CheckinProps = {
  visible: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

export function Checkin({ visible, onClose, onRefresh }: CheckinProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<any | null>(null);
  const [scanned, setScanned] = useState(false);
  const [credentialCode, setCredentialCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(true);
  const [checkinType, setCheckinType] = useState<"codigo" | "manual">("codigo");

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setCredentialCode(data);
    await handleCheckin(data);
  };

  const handleCheckin = async (code: string) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await api.post("/checkin/checkin", {
        credential_code: code,
      });
      alert("Checkin realizado com sucesso");
      showMessage({
        message: response.data.message,
        type: "success",
      });
      onRefresh();
    } catch (error: any) {
      alert(error.response?.data?.error || "Erro ao realizar check-in");
      showMessage({
        message: error.response?.data?.error || "Erro ao realizar check-in",
        type: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualCheckin = async () => {
    if (credentialCode.trim()) {
      await handleCheckin(credentialCode);
    } else {
      showMessage({
        message: "Por favor, insira um código de credencial válido.",
        type: "danger",
      });
    }
  };

  const handleTypeCheckin = (type: "codigo" | "manual") => {
    setCheckinType(type);
  };

  if (hasPermission === null) {
    return <S.Alert>Solicitando permissão de câmera</S.Alert>;
  }

  if (hasPermission === false) {
    return (
      <S.Container>
        <S.Alert>Sem acesso à câmera</S.Alert>
      </S.Container>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Precisamos da sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  return (
    <>
      <FlashMessage position="top" />
      <S.Modal
        visible={visible}
        onRequestClose={onClose}
        animationType="slide"
        transparent
      >
        <S.Container>
          <S.ModalTop>
            <S.BoxText>
              <S.Title>Check-in </S.Title>
              <S.SubTitle>Realize o check-in dos usuários </S.SubTitle>
            </S.BoxText>
            <S.Closer onPress={onClose}>
              <AntDesign name="close" size={30} color="black" />
            </S.Closer>
          </S.ModalTop>
          <S.ModaCheckinType>
            <S.BtnTypeCheckin
              style={{
                backgroundColor:
                  checkinType === "codigo" ? "#3EB71C" : "#FFFFFF",
              }}
              onPress={() => handleTypeCheckin("codigo")}
            >
              <S.BtnTypeCheckinText
                style={{
                  color: checkinType === "codigo" ? "#FFFFFF" : "#000000",
                }}
              >
                Checkin Código
              </S.BtnTypeCheckinText>
            </S.BtnTypeCheckin>

            <S.BtnTypeCheckin
              style={{
                backgroundColor:
                  checkinType === "manual" ? "#3EB71C" : "#FFFFFF",
              }}
              onPress={() => handleTypeCheckin("manual")}
            >
              <S.BtnTypeCheckinText
                style={{
                  color: checkinType === "manual" ? "#FFFFFF" : "#000000",
                }}
              >
                Checkin Manual
              </S.BtnTypeCheckinText>
            </S.BtnTypeCheckin>
          </S.ModaCheckinType>

          <S.ModalContainer>
            {checkinType === "codigo" ? (
              <S.Overlay>
                {Platform.OS === "android" ? <StatusBar hidden /> : null}
                {loadingCamera && (
                  <ActivityIndicator
                    size="large"
                    color="#3EB71C"
                    style={StyleSheet.absoluteFillObject}
                  />
                )}

                <CameraView
                  facing="back"
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                  onCameraReady={() => setLoadingCamera(false)}
                  style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                  <Button
                    title="Escanear novamente"
                    onPress={() => setScanned(false)}
                  />
                )}

                {isSubmitting ? (
                  <ActivityIndicator
                    color="#FFFFFF"
                    size={30}
                    style={{ backgroundColor: " rgba(0, 0, 0, 0.7)" }}
                  />
                ) : (
                  <></>
                )}

                <S.unfocusedContainer />
                <S.middleContainer>
                  <S.unfocusedContainer />
                  <S.focusedContainer />
                  <S.unfocusedContainer />
                </S.middleContainer>

                <S.unfocusedContainer />
              </S.Overlay>
            ) : (
              <S.manualContainer>
                <S.Title style={{ bottom: 50, textAlign: "center" }}>
                  Insira o código do evento manualmente
                </S.Title>
                <S.BoxCodeManual>
                  <S.IconeCode>
                    <FontAwesome6
                      name="qrcode"
                      size={20}
                      color="black"
                      justify="center"
                    />
                  </S.IconeCode>
                  <S.InputCode
                    placeholder="* * * * * * * * *"
                    value={credentialCode}
                    onChangeText={setCredentialCode}
                    keyboardType="numeric"
                  />
                </S.BoxCodeManual>
                <S.BtnCloseModal
                  onPress={handleManualCheckin}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <S.TextBtnModal>Registrar</S.TextBtnModal>
                  )}
                </S.BtnCloseModal>
              </S.manualContainer>
            )}
          </S.ModalContainer>
        </S.Container>
      </S.Modal>
    </>
  );
}
