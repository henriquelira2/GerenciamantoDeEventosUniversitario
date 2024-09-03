/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";
export const Modal = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Topo = styled.View`
  flex-direction: row;
  background-color: ${theme.COLORS.GREEN};
  width: 90%;
  justify-content: space-between;
  padding: 5px;
  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.COLORS.WHITE};
`;
export const Closer = styled.TouchableOpacity`
  background-color: ${theme.COLORS.RED};
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
