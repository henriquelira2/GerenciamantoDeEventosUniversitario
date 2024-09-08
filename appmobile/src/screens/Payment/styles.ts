import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const PaymentMethodButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  background-color: #e0e0e0;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SelectedMethodButton = styled(PaymentMethodButton)`
  background-color: #4caf50;
`;

export const PaymentMethodText = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const PayButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #2196f3;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const PayButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
