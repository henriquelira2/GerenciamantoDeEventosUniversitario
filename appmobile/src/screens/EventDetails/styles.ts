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

export const Scroll = styled.ScrollView`
  width: 100%;
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
  display: flex;
  background-color: ${theme.COLORS.WHITE};
  width: 100%;
  height: 70%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  bottom: 5%;
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

export const EventTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.COLORS.DARK};
  text-align: center;
  margin-bottom: 10px;
`;

export const EventText = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.GRAY300};
  margin-top: 10px;
  bottom: 7px;
  left: 10px;
`;

export const EventLocation = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const EventDate = styled.View`
  flex-direction: row;
`;

export const EvenHour = styled.View`
  flex-direction: row;
`;

export const TicketPrice = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.COLORS.RED100};
  margin-top: 20px;
`;

export const DescriptionContainer = styled.View`
  margin-top: 20px;
`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.GRAY300};
  line-height: 24px;
`;

export const EditModalButton = styled.TouchableOpacity`
  background-color: ${theme.COLORS.RED100};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  width: 90%;
`;

export const EditModalButtonText = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
  font-weight: bold;
`;

export const DeletModalButton = styled.TouchableOpacity`
  background-color: ${theme.COLORS.RED100};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
  width: 90%;
`;

export const DeletModalButtonText = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
  font-weight: bold;
`;

export const SignupEvent = styled.TouchableOpacity`
  background-color: ${theme.COLORS.RED100};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  width: 90%;
`;

export const SignupEventText = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.WHITE};
  font-weight: bold;
`;

export const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const BtnBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

export const Modal = styled.Modal``;
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 80%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  color: ${theme.COLORS.DARK};
  text-align: center;
  margin-bottom: 20px;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${theme.COLORS.GREEN};
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
