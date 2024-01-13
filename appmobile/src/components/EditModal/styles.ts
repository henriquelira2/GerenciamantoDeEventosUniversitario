import styled from "styled-components/native";

import theme from "../../theme";
export const Modal = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  bottom: 0%;
`;

export const Topo = styled.View`
  flex-direction: row;
  background-color: ${theme.COLORS.GOLD};
  width: 90%;
  justify-content: space-between;
  padding: 5px;
  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: ${theme.COLORS.WHITE};
`;
export const Closer = styled.TouchableOpacity`
  background-color: ${theme.COLORS.RED};
`;

export const box = styled.View`
  width: 90%;
  height: 75%;
  padding-top: 5%;
  background-color: ${theme.COLORS.WHITE};
  border: 2px;
`;
export const ScrollView = styled.ScrollView`
  width: 100%;
`;

export const TextUser = styled.Text`
  font-size: 12px;
  margin-left: 5%;
  color: ${theme.COLORS.GOLD};
`;
export const Input = styled.TextInput`
  border-bottom-width: 2px;
  margin-left: 5%;
  font-size: 18px;
  padding: 2px;
  margin-bottom: 20px;
  color: ${theme.COLORS.DARK};
  width: 90%;
`;
export const TextErro = styled.Text`
  width: 70%;
  margin-left: 5%;
  color: ${theme.COLORS.RED100};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50%;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
  margin-bottom: 10px;
`;
export const TextButtom = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.WHITE};
`;
