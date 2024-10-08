/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 20%;
`;

export const ScrollView = styled.ScrollView`
  width: 100%;
  padding-top: 0px;
  margin-bottom: 80px;
`;

export const ContainerLinkImg = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10%;
`;
export const Text = styled.Text`
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 25%;
`;
export const UploadImg = styled.TouchableOpacity`
  align-items: center;
  border-radius: 5px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  right: 100%;
  top: -4%;
  height: 200%;
  width: 40%;
`;
export const CopiarImg = styled.TouchableOpacity`
  border-radius: 5px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  left: 100%;
  top: -4%;
  height: 200%;
  width: 40%;
`;
export const ImgButoon = styled.View`
  flex-direction: row;
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
  background-color: ${theme.COLORS.WHITE};
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
  background-color: ${theme.COLORS.WHITE};
`;

export const TextInputDateTime = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 50px;
  background-color: ${theme.COLORS.WHITE};
`;

export const TextInputSelect = styled.View`
  width: 80%;
  height: 55px;
  border-width: 1px;
  border-radius: 10px;
  padding-left: 30px;
 
  background-color: ${theme.COLORS.WHITE};
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