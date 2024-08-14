import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${theme.COLORS.WHITE};
`;
export const Top = styled.View`
  width: 100%;
  align-items: center;
`;
export const ImageTop = styled.Image`
  margin-top: 5%;
  margin-bottom: 2%;
`;
