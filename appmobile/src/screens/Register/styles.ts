import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 60%;
  height: 25%;
  margin-bottom: 10px;
`;
export const Box = styled.View`
  flex: 0.98;
  bottom: 5%;
  width: 90%;
  height: 50%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 70px;
  border-bottom-right-radius: 70px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${theme.COLORS.WHITE};
`;
export const ScrollView = styled.ScrollView`
  width: 100%;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
`;
export const Title = styled.Text`
  font-size: 30px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 30px;
  color: ${theme.COLORS.DARK};
`;

export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;
export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 50px;
  background-color: ${theme.COLORS.GRAY100};
`;
export const ButtomEyes = styled.TouchableOpacity``;
export const RegisterButtom = styled.TouchableOpacity`
  width: 60%;
  height: 40px;
  margin-bottom: 5%;
  border-radius: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;
export const TextButtomRegister = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;
export const LoginButtom = styled.TouchableOpacity`
  padding-bottom: 10px;
`;
export const TextButtomLogin = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.DARK};
`;
