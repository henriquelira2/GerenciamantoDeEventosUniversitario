import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
  bottom: 10%;
`;
export const ScrollView = styled.ScrollView`
  top: 10%;
  margin-bottom: 20%;
`;
export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 50px;
  width: 60%;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
  margin-top: 20%;
`;
export const Usuario = styled.View`
  border-bottom-width: 2px;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
export const box = styled.View``;

export const TextName = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.DARK};
`;
export const TextCpf = styled.Text`
  font-size: 15px;
  color: ${theme.COLORS.GRAY200};
`;
export const IconBtn = styled.TouchableOpacity`
  top: 10px;
`;
export const TextButtom = styled.Text`
  color: ${theme.COLORS.DARK};
`;
