/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Modal = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  bottom: 0%;
`;

export const Topo = styled.View`
  flex-direction: row;
  background-color: transparent;
  width: 100%;
  height: 80%;
  justify-content: space-between;
  align-items: center;
`;

export const Bot = styled.ImageBackground`
  width: 100%;
`;

export const ScrollView = styled.ScrollView`
  display: flex;
  bottom: 10%;
  height: 40%;
  width: 100%;
  border: 1px solid gray;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${theme.COLORS.WHITE};
`;

export const Title = styled.Text`
  position: relative;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  padding-left: 10px;
  color: ${theme.COLORS.DARK};
  margin: 10px;
`;

export const CloseModal = styled.TouchableOpacity`
  left: 40%;
  width: 13%;
  height: 15%;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  bottom: 42%;
`;

export const box = styled.View`
  width: 90%;
  height: 20%;
  padding-top: 5%;
  background-color: ${theme.COLORS.WHITE};
  border: 2px;
  align-items: center;
  justify-content: center;
`;

export const Alert = styled.Text`
  font-size: 20px;
`;

export const Buttom = styled.View`
  flex-direction: row;
  padding: 20px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50%;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
  margin-left: 10px;
`;

export const TextButtom = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.WHITE};
`;
