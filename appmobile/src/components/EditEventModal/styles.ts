/* eslint-disable prettier/prettier */
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

export const Bot = styled.ImageBackground`
  width: 100%;
`;

export const ScrollView = styled.ScrollView`
  display: flex;
  bottom: 5%;
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${theme.COLORS.WHITE};
`;

export const CloseModal = styled.TouchableOpacity`
  left: 40%;
  width: 15%;
  height: 5%;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  bottom: 97%;
`;

export const Title = styled.Text`
  position: relative;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  padding-left: 10px;
  color: ${theme.COLORS.DARK};
  margin: 10px;
`;

export const PreviwImage = styled.View`
  border: 2px;
  border-color: ${theme.COLORS.DARK};
  width: 80%;
  height: 140px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;

export const BannerEvent = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: fill;
`;

export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const btnImage = styled.TouchableOpacity`
  position: absolute;
  width: 25%;
  height: 40px;
  z-index: 1;
  border: 1px;
  justify-content: center;
  align-items: center;
  top: 10%;
  left: 2%;
  border-radius: 8px;
  border-color: ${theme.COLORS.DARK};
`;

export const TextButtom = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.DARK};
`;

export const TextInputImage = styled.TextInput`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 110px;
  padding-right: 10px;
  border-style: dashed;
  border-color: ${theme.COLORS.DARK};
  background-color: ${theme.COLORS.GRAY100};
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 5px;
  background-color: ${theme.COLORS.GRAY100};
`;

export const TextInputDateTime = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  background-color: ${theme.COLORS.GRAY100};
`;

export const placeholderDateTime = styled.TextInput`
  width: 80%;
  height: 50px;
  color: ${theme.COLORS.DARK};
`;

export const TextInputSelect = styled.View`
  width: 80%;
  height: 55px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 30px;

  background-color: ${theme.COLORS.GRAY100};
`;

export const UpdateButtom = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  margin-top: 5%;
  margin-bottom: 15%;
  border-radius: 10px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.GOLD};
  z-index: 1;
`;

export const TextButtomUpdate = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;
