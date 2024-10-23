import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  padding-top: 30%;
  align-items: center;
  margin-bottom: 15%;
`;

export const Search = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
  align-items: center;
  justify-content: center;
`;

export const InputSeach = styled.TextInput`
  width: 90%;
  height: 50px;
  padding-left: 50px;
  padding-right: 5px;
  background-color: ${theme.COLORS.GRAY};
  opacity: 0.8;
`;

export const Usuario = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px 20px 20px;
  border-bottom-width: 1px;
  margin-bottom: 25px;
`;

export const Avatar = styled.Image`
  width: 25%;
  height: 100%;
  padding: 5px;
  border-width: 3px;
  border-radius: 90px;
  margin-bottom: 30px;
  border-color: ${theme.COLORS.WHITE};
`;

export const box = styled.View`
  width: 60%;
  margin-left: 5px;
`;

export const TextName = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;

export const TextCpf = styled.Text`
  font-size: 15px;
  color: ${theme.COLORS.DARK};
`;

export const IconBtn = styled.TouchableOpacity`
  top: 10px;
`;

export const TextButtom = styled.Text`
  color: ${theme.COLORS.DARK};
`;
