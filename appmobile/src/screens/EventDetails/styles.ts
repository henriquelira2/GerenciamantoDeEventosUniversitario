/* eslint-disable prettier/prettier */
import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #ffffff;
`;

export const EventImage = styled.Image`
  width: 100%;
  height: 300px;
 
`;

export const EventInfoContainer = styled.View`
  padding: 0px 20px 0px 20px;
  flex-direction: row;
`;

export const CloseModal = styled.TouchableOpacity`
  left: 5%;
  bottom: 28%;
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
`;
