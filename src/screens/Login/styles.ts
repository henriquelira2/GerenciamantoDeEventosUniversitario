import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
`;
export const Logo = styled.Image`
  width: 60%;
  height: 25%;
`;
export const Box = styled.View`
  bottom: 3%;
  width: 90%;
  height: 75%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 80px;
  border-bottom-right-radius: 80px;
  background-color: ${theme.COLORS.WHITE};
`;
export const Title = styled.Text`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
  color: ${theme.COLORS.DARK};
`;
export const Input = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
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
export const LoginButtom = styled.TouchableOpacity`
  border-radius: 50px;
  width: 60%;
  height: 40px;
  margin-top: 10%;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.GOLD};
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
  color: ${theme.COLORS.GRAY};
`;
