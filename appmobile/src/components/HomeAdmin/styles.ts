import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Top = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;
export const ImageTop = styled.Image`
  width: 60%;
  height: 50%;
  margin-top: 20px;
`;

export const Bot = styled.View`
  flex: 2;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
`;
export const ScrollView = styled.ScrollView``;
export const User = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
  right: 15%;
  border: 1px;
`;
export const TextUser = styled.Text`
  font-size: 12px;
  padding: 0px 5px 0px 10px;
  text-transform: uppercase;
`;
export const Box_1 = styled.View`
  flex-direction: row;
  height: 110px;
  margin-bottom: 60px;
`;

export const Touch_1 = styled.View`
  width: 45%;
  margin: 10px;
  border-radius: 5px;
  padding-top: 10px;
  align-items: center;
`;
export const Icon = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: 600;
  padding-top: 20px;
  color: ${theme.COLORS.DARK};
  text-align: center;
`;
