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

export const ScrollView = styled.View`
  display: flex;
  bottom: 5%;
  height: 100%;
  width: 100%;
  border: 1px solid gray;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${theme.COLORS.WHITE};
`;

export const TotalUsersText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

export const UserContainer = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px 20px 20px 20px;
  border-bottom-width: 1px;
  margin-bottom: 25px;
`;

export const box = styled.View``;

export const TextName = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  color: ${theme.COLORS.DARK};
`;

export const TextEmail = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: ${theme.COLORS.DARK};
`;

export const Avatar = styled.Image`
  width: 25%;
  height: 100%;
  padding: 5px;
  border-width: 3px;
  border-radius: 90px;
  margin-bottom: 30px;
  border-color: ${theme.COLORS.WHITE};
`;

export const UserName = styled.Text`
  font-size: 16px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: gray;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const NoUsersText = styled.Text`
  font-size: 16px;
  color: red;
  margin-top: 20px;
`;
