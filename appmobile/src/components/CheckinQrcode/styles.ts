/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
  padding: 5px;
`;

export const BoxText = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const BorderText = styled.View`
  width: 25%;
  height: 30%;
  border-bottom-width: 1px;
  border-color: ${theme.COLORS.GRAY100};
`;

export const BoxCodeManual = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const InputCode = styled.TextInput`
  border: 1px;
  width: 80%;
  padding: 5px 5px 5px 20px;
  border-radius: 5px;
  border-color: ${theme.COLORS.GRAY100};
  margin-right: 5px;
`;

export const IconeCode = styled.TouchableOpacity`
  flex: 1;
  border: 1px;
  border-radius: 5px;
  border-color: ${theme.COLORS.GRAY100};
  justify-content: center;
  align-items: center;
`;
