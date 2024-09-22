import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  z-index: 999;
`;
export const Top = styled.View`
  padding: 20px;
  bottom: 5%;
  align-items: center;
`;

export const LogoTop = styled.Image`
  width: 100%;
  height: 100px;
`;
export const Middle = styled.View`
  flex: 1;
  padding: 0px;
  background-color: ${theme.COLORS.WHITE};
`;
export const DrawerBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BoxLeft = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextDrawer = styled.Text`
  text-align: center;
  left: 30%;
  font-size: 14px;
  font-weight: bold;
`;

export const Bottom = styled.View`
  margin-top: 25%;
  border-top-width: 1px;
  border-top-color: ${theme.COLORS.GRAY200};
`;

export const Icon = styled.Image``;
