import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.COLORS.GREEN};
`;

export const Logo = styled.Image`
  margin-top: 30%;
`;

export const Icone = styled.Image`
  margin-top: 5%;
`;

export const subText = styled.Text`
  width: 80%;
  margin-top: 5%;
  text-align: center;
  color: ${theme.COLORS.WHITE};
`;

export const TitleText = styled.Text`
  width: 80%;
  margin-top: 10%;
  font-size: 30px;
  text-align: center;
  color: ${theme.COLORS.WHITE};
`;

export const Box = styled.View`
  width: 100%;
  height: 20%;
  margin-top: 30%;
  align-items: center;
  background-color: ${theme.COLORS.WHITE};
`;

export const text = styled.Text`
  width: 80%;
  margin-top: 5%;
  font-weight: 500;
  text-align: center;
  color: ${theme.COLORS.GRAY200};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 60%;
  height: 40px;
  margin-top: 5%;
  align-self: center;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: ${theme.COLORS.GREEN};
`;

export const TextButtom = styled.Text`
  color: ${theme.COLORS.WHITE};
`;
