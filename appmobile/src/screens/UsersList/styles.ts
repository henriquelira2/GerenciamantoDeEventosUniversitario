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
export const Usuario = styled.View`
  border: 2px white;
  margin-bottom: 20px;
  padding: 20px;
  width: 80%;
`;
