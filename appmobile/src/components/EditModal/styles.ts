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
  background-color: transparent;
  width: 100%;
  height: 30%;
  justify-content: space-between;
  align-items: center;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const Bot = styled.ImageBackground`
  width: 100%;
`;

export const CloseModal = styled.TouchableOpacity`
  left: 85%;
  width: 10%;
  height: 10%;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

export const Title = styled.Text`
  position: relative;
  bottom: 5%;
  font-size: 24px;
  font-weight: 600;
  padding-left: 10px;
  color: ${theme.COLORS.DARK};
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
  display: flex;
  bottom: 5%;
  height: 90%;
  width: 100%;
  border: 1px solid gray;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${theme.COLORS.WHITE};
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

export const TextInputSelect = styled.View`
  border-bottom-width: 2px;
  margin-left: 5%;
  font-size: 18px;
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
  width: 50%;
  height: 40px;
  align-self: center;
  align-items: center;
  border-radius: 50px;
  margin-bottom: 100px;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;

export const TextButtom = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.WHITE};
`;
