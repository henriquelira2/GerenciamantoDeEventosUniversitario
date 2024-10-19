/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  margin: 3px;
`;
export const Box = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 2px;
  height: 120px;
  border-radius: 5px;
`;
export const Icon = styled.Image`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
`;

export const BoxTitle = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-right-width: 1px;
  border-top-right-radius: 50px;
`;

export const Info = styled.Text`
  font-size: 12px;
  color: black;
  text-align: center;
  color: ${theme.COLORS.WHITE};
  width: 80%;
  height: 24%;
  margin-bottom: 5px;
`;
