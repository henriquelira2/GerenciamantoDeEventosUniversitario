import styled from "styled-components/native";

import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`;
export const Top = styled.View`
  flex: 0.8;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  transform: scaleX(1);
  border-bottom-left-radius: 00px;
  border-bottom-right-radius: 1000px;
  background-color: rgba(139, 0, 0, 1);
`;
export const BoxTextTop = styled.View`
  align-items: center;
  left: 10%;
`;
export const NameText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${theme.COLORS.WHITE};
`;
export const EmailText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.COLORS.GRAY};
`;
export const Avatar = styled.Image`
  border-width: 5px;
  border-radius: 90px;
  border-color: ${theme.COLORS.GRAY};
  height: 65%;
  width: 40%;
  right: 10%;
  top: 10%;
`;

export const Bot = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.WHITE};
`;
export const BoxBot = styled.View`
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  width: 60%;
`;
export const Icon = styled.View`
  border-radius: 50px;
  padding: 15px;
  background-color: ${theme.COLORS.WHITE};
`;
export const BoxTextBot = styled.View``;
export const TextInfo = styled.Text`
  color: ${theme.COLORS.GRAY200};
  margin-bottom: 5px;
`;

export const TextBot = styled.Text`
  font-size: 20px;
`;
