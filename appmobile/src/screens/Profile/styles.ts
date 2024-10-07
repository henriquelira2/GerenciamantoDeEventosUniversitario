import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 45%;
  height: 30%;
  padding: 1px;
  margin-top: 10%;
  border-width: 5px;
  border-radius: 90px;
  margin-bottom: 30px;
  border-color: ${theme.COLORS.WHITE};
`;

export const BoxBot = styled.View`
  width: 80%;
  flex-direction: row;
  margin-bottom: 30px;
  border-bottom-width: 1px;
`;

export const Icon = styled.View`
  border-radius: 50px;
  padding: 15px;
  bottom: 2%;
`;

export const BoxTextBot = styled.View``;
export const TextInfo = styled.Text`
  color: ${theme.COLORS.WHITE};
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
`;

export const TextBot = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.WHITE};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  opacity: 0.8;
  align-self: center;
  align-items: center;
  border-radius: 50px;
  margin-bottom: 100px;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;

export const TextButtom = styled.Text`
  font-size: 12px;
  color: ${theme.COLORS.WHITE};
`;
