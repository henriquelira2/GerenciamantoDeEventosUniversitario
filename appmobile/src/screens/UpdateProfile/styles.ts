import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.COLORS.WHITE};
`;
export const Avatar = styled.View`
  border-radius: 100px;
  border-color: rgba(0, 0, 0, 0.7);
  margin-top: 40px;
  padding: 2px;
  border: 2px;
`;
export const ScrollView = styled.ScrollView`
  width: 100%;
`;

export const box = styled.View`
  width: 80%;
  margin-top: 10px;
`;
export const TextUser = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.BLUE100};
`;
export const Input = styled.TextInput`
  border-bottom-width: 2px;
  font-size: 18px;
  padding: 2px;
  margin-bottom: 20px;
  color: ${theme.COLORS.DARK};
`;
export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50%;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
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
