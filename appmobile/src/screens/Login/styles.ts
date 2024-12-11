import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 60%;
  height: 27%;
`;
export const Box = styled.View`
  bottom: 5%;
  width: 90%;
  height: 70%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
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
  margin-bottom: 50px;
  color: ${theme.COLORS.DARK};
`;

export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;
export const TextErro = styled.Text`
  width: 70%;
  color: ${theme.COLORS.YELLOW};
`;
export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 50px;
  background-color: ${theme.COLORS.GRAY100};
`;
export const ForgotView = styled.View`
  width: 70%;
  align-items: flex-end;
  bottom: 15px;
`;
export const ForgotTouch = styled.TouchableOpacity`
  padding: 10px;
`;
export const ForgotText = styled.Text`
  border-bottom-width: 2px;
  border-color: ${theme.COLORS.BLUE};
  text-align: end;
`;
export const ButtomEyes = styled.TouchableOpacity`
  position: absolute;
  height: 100%;
  width: 12%;
  right: 0%;
  z-index: 999;
`;
export const LoginButtom = styled.TouchableOpacity`
  border-radius: 50px;
  width: 60%;
  height: 40px;
  margin-top: 5%;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;
export const TextButtomLogin = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;
export const RegisterButtom = styled.TouchableOpacity`
  border-radius: 50px;
  width: 60%;
  height: 40px;
  margin-top: 10%;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
export const TextButtomRegister = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.DARK};
`;
