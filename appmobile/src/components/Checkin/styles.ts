/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Modal = styled.Modal``;

export const ModalTop = styled.View`
  width: 100%;
  height: 10%;
  margin-bottom: 5px;
  border-radius: 10px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-color: ${theme.COLORS.WHITE};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const BoxText = styled.View`
  padding: 10px;
 
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 10px;
`;
export const SubTitle = styled.Text`
  font-size: 12px;
  color: ${theme.COLORS.GRAY200};
`;

export const Closer = styled.TouchableOpacity`
  width: 15%;
  padding: 10px;
  border: 1px solid;
  align-items: center;
  border-radius: 50px;
  justify-content: center;
  border-color: ${theme.COLORS.GRAY100};
`;
export const ModaCheckinType = styled.View`
  height: 6%;
  width: 98%;
  margin-bottom: 5px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${theme.COLORS.WHITE};
`;

export const BtnTypeCheckin = styled.TouchableOpacity`
  width: 45%;
  height: 80%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const BtnTypeCheckinText = styled.Text``;

export const ModalContainer = styled.View`
  flex: 1;
  overflow: hidden;
  width: 100%;
  border-radius: 40px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${theme.COLORS.WHITE};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.COLORS.DARK};
`;

export const Alert = styled.Text`
  background-color: #fff111;
  margin-top: 50%;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

export const unfocusedContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const middleContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const focusedContainer = styled.View`
  flex: 4;
  border-width: 2px;
  border-color: white;
  border-radius: 5px;
`;
export const manualContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const BoxCodeManual = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  padding: 20px;
`;

export const InputCode = styled.TextInput`
  border: solid 1px;
  border-color: ${theme.COLORS.GRAY100};
  border-left-width: 0px;
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
  width: 90%;
`;

export const IconeCode = styled.View`
  position: relative;
  border: solid 1px;
  width: 10%;
  border-color: ${theme.COLORS.GRAY100};
  align-items: center;
  border-radius: 10px 0px 0px 10px;
  border-right-width: 0px;
  justify-content: center;
`;

export const BtnCloseModal = styled.TouchableOpacity`
  height: 7%;
  border-radius: 10px;
  background-color: ${theme.COLORS.BLUE};
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const TextBtnModal = styled.Text`
  color: ${theme.COLORS.WHITE};
`;
