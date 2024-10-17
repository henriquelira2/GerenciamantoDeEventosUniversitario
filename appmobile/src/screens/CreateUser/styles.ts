import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 20%;
`;

export const ScrollView = styled.ScrollView`
  width: 100%;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
  padding-top: 30px;
  margin-bottom: 100px;
`;

export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;

export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  background-color: ${theme.COLORS.WHITE};
`;

export const ButtomEyes = styled.TouchableOpacity``;
export const RegisterButtom = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  margin-bottom: 20%;
  border-radius: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;

export const TextButtomRegister = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;

export const TextUser = styled.Text`
  font-size: 12px;
  margin-left: 5%;
  color: ${theme.COLORS.GOLD};
`;

export const TextInputSelect = styled.View`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  background-color: ${theme.COLORS.WHITE};
`;