/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  margin: 5px 5px 3px 10px;
`;
export const Box = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 2px;
  height:150px;

  border-radius: 5px;
`;

export const Info = styled.Text`
  font-size: 12px;
  color: black;
  text-align: center;
  color: ${theme.COLORS.WHITE};
  width: 80%;
  height: 24%;
  margin-bottom: 2px;
`;
