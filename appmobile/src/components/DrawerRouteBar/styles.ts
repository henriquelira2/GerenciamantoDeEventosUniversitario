import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  z-index: 999;
`;
export const Top = styled.View`
  padding: 20px;
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
  padding: 20px;
  border-top-width: 1px;
  border-top-color: ${theme.COLORS.GRAY200};
`;
export const ButtomBottom = styled.TouchableOpacity`
  padding: 5px 15px 15px 0px;
`;
export const BottomBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const BottomText = styled.Text`
  font-size: 15px;
  margin-left: 10px;
`;

export const Icon = styled.Image``;
