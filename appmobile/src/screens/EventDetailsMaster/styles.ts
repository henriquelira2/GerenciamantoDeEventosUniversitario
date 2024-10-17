/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`;

export const BoxContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${theme.COLORS.WHITE};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${theme.COLORS.WHITE};
`;

export const Topo = styled.View`
  flex-direction: row;
  background-color: ${theme.COLORS.WHITE};
  width: 100%;
  height: 40%;
  justify-content: space-between;
  align-items: center;
`;

export const EventImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Bot = styled.View`
  align-items: center;
  display: flex;
  bottom: 5%;
  height: 70%;
  width: 100%;
  border: 1px solid gray;
  padding-bottom: 15%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${theme.COLORS.WHITE};
`;

export const EventInfoContainer = styled.View`
  padding: 0px 20px 0px 20px;
  flex-direction: row;
`;

export const CloseModal = styled.TouchableOpacity`
  right: 40%;
  bottom: 100%;
  width: 10%;
  height: 5%;
  opacity: 0.8;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${theme.COLORS.DARK};
`;

export const EventTitleView = styled.View`
  align-items: center;
`;
export const FlatList = styled.FlatList`
  width: 100%;
`;

export const EventTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: ${theme.COLORS.DARK};
  margin-bottom: 10px;
  font-style: italic;
`;

export const EventText = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.GRAY300};
  margin-top: 10px;
  bottom: 7px;
  left: 10px;
`;

export const ConfigView = styled.View`
  width: 90%;
  height: 10%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  flex-direction: row;
`;

export const BtnAction = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
`;
