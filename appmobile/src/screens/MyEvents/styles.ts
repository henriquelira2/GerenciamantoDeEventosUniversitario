// styles.ts
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding-top: 20%;
`;

export const Search = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const InputSeach = styled.TextInput`
  width: 90%;
  height: 50px;
  padding-left: 50px;
  padding-right: 5px;
  background-color: ${theme.COLORS.GRAY};
  opacity: 0.8;
  border-radius: 5px;
`;

export const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
  margin-bottom: 20%;
`;
export const ContaineFlatlist = styled.View``;

export const BoxEvent = styled.TouchableOpacity`
  width: 100%;
  height: 300px;
  padding: 1px 20px;
  margin-bottom: 30px;
`;

export const ImageEvent = styled.Image`
  width: 100%;
  height: 60%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const BoxInfo = styled.View`
  width: 100%;
  height: 40%;
  flex-direction: row;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 10px;
  bottom: 5px;
`;

export const Info1 = styled.View`
  width: 70%;
  height: 100%;
  padding-left: 10px;
  justify-content: center;
`;

export const Info2 = styled.View`
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const TitleEvent = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Location = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
`;

export const DateHour = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Hour = styled.Text`
  font-size: 12px;
`;

export const Date = styled.Text`
  font-size: 12px;
  right: 100%;
`;

export const Price = styled.Text`
  background-color: ${theme.COLORS.GRAY100};
  color: ${theme.COLORS.DARK};
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  border-radius: 5px;
  padding: 8px;
`;

export const Modal = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const BoxModal = styled.View`
  background-color: ${theme.COLORS.WHITE};
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  height: 65%;
`;

export const BtnCloseModal = styled.TouchableOpacity`
  height: 7%;
  border-radius: 10px;
  background-color: ${theme.COLORS.BLUE};
  justify-content: center;
  align-items: center;
`;

export const TextBtnModal = styled.Text`
  color: ${theme.COLORS.WHITE};
`;
