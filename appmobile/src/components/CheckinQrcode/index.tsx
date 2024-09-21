/* eslint-disable prettier/prettier */
import { FontAwesome6 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

import * as S from "./styles";

interface CheckinQrcodeProps {
  credential_code: string;
}

export function CheckinQrcode({ credential_code }: CheckinQrcodeProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(credential_code);
  };

  return (
    <S.Container>
      <S.Title>QR-Code do Evento </S.Title>
      <S.SubTitle>
        Apresente esse qr-code para realizar seu check-in no evento
      </S.SubTitle>
      {credential_code ? (
        <QRCode value={credential_code} size={200} />
      ) : (
        <S.SubTitle>Nenhum código de credencial disponível</S.SubTitle>
      )}
      <S.BoxText>
        <S.BorderText />
        <S.SubTitle>Ou utilize o código abaixo</S.SubTitle>
        <S.BorderText />
      </S.BoxText>
      <S.BoxCodeManual>
        <S.InputCode value={credential_code} />
        <S.IconeCode>
          <TouchableOpacity onPress={copyToClipboard}>
            <FontAwesome6 name="copy" size={20} color="black" />
          </TouchableOpacity>
        </S.IconeCode>
      </S.BoxCodeManual>
    </S.Container>
  );
}
