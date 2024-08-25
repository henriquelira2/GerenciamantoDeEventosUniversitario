/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
`;

export const ScrollView = styled.ScrollView`
  width: 100%;
  padding-top: 0px;
  margin-bottom: 80px;
`;

export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
 
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

export const TextInputDateTime = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  background-color: ${theme.COLORS.GRAY100};
`;

export const TextInputSelect = styled.View`
  width: 80%;
  height: 55px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 30px;
 
  background-color: ${theme.COLORS.GRAY100};
`;


export const placeholderDateTime = styled.TextInput`
  width: 80%;
  height: 50px;
  color: ${theme.COLORS.DARK};
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
  border-color:  ${theme.COLORS.DARK};
`;

export const TextButtom = styled.Text`
  font-size: 10px;
  color: ${theme.COLORS.DARK};
`;

export const BannerEvent = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: fill;
`;

export const PreviwImage = styled.View`
  border: 2px;
  border-color:  ${theme.COLORS.DARK};
  width: 80%;
  height: 140px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const RegisterButtom = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  margin-top: 5%;
  margin-bottom: 15%;
  border-radius: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
  z-index:1
`;
export const TextButtomRegister = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;

export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;