import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 50%;
  height: 30%;
  padding: 21px;
  border-width: 5px;
  border-radius: 90px;
  margin-bottom: 30px;
  margin-top: 50px;
  border-color: ${theme.COLORS.WHITE};
`;

export const box = styled.View`
  width: 80%;
  margin-top: 10px;
`;

export const TextUser = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: ${theme.COLORS.WHITE};
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  font-size: 20px;
  padding: 3px;
  margin-bottom: 20px;
  color: ${theme.COLORS.WHITE};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50%;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 20px;
  opacity: 0.8;
  background-color: ${theme.COLORS.RED};
`;

export const TextButtom = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.WHITE};
`;

export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;
