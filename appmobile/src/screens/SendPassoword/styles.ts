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
  width: 90%;
  height: 70%;
  bottom: 5%;
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
  margin-bottom: 20px;
  color: ${theme.COLORS.DARK};
`;
export const TextInfo = styled.Text`
  text-align: center;
  padding: 5px;
  margin-bottom: 50px;
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
  padding-left: 20px;
  background-color: ${theme.COLORS.GRAY100};
`;

export const SendButtom = styled.TouchableOpacity`
  border-radius: 50px;
  width: 60%;
  height: 40px;
  margin-top: 5%;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.RED};
  margin-bottom: 30px;
`;
export const TextButtom = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
`;
export const iconRun = styled.View`
  flex-direction: row;
`;
