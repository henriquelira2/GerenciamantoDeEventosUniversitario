import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.YELLOW};
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
export const TextButtom = styled.Text`
  color: ${theme.COLORS.WHITE};
`;

export const Button = styled.TouchableOpacity`
  width: 50%;
  height: 48px;
  background-color: ${theme.COLORS.DARK};
  border-radius: 10px;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${theme.COLORS.WHITE};
`;
