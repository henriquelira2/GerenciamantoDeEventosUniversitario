import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  bottom: 10%;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
`;
export const Filter = styled.View`
  top: 15%;
  width: 100%;
  margin-bottom: 20%;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 2px;
  justify-content: space-around;
`;
export const InputFilter = styled.TextInput`
  width: 75%;
  height: 50px;
  border-width: 2px;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 40px 20px 30px 20px;
  color: ${theme.COLORS.DARK};
  background-color: ${theme.COLORS.WHITE};
`;

export const Usuario = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px 20px 20px 20px;
  border-bottom-width: 2px;
  margin-bottom: 20px;
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
