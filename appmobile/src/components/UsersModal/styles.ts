/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

export const TotalUsersText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

export const UserContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  width: 100%;
`;

export const UserName = styled.Text`
  font-size: 16px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: gray;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
