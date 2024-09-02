// styles.ts
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.COLORS.RED};
  padding-top: 25%;
`;

export const Search = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const InputSeach = styled.TextInput`
  width: 90%;
  height: 50px;
  border-radius: 30px;
  padding-left: 50px;
  padding-right: 5px;
  background-color: ${theme.COLORS.GRAY};
  opacity: 0.8;
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
  padding: 16px 20px;
`;

export const ImageEvent = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const BoxInfo = styled.View`
  width: 100%;
  height: 30%;
  opacity: 0.9;
  flex-direction: row;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: ${theme.COLORS.GRAY100};
`;

export const Info1 = styled.View`
  width: 70%;
  height: 100%;
  padding-left: 10px;
  justify-content: center;
  border-bottom-left-radius: 30px;
`;

export const Info2 = styled.View`
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 30px;
`;

export const TitleEvent = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: 20px;
  font-weight: bold;
`;

export const LocationHour = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: 14px;
`;

export const Price = styled.Text`
  background-color: ${theme.COLORS.WHITE};
  color: ${theme.COLORS.DARK};
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  border-radius: 20px;
  padding: 8px;
`;
