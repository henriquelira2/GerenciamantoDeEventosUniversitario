import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
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
  font-size: 30px;
`;
