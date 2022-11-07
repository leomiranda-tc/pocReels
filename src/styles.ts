import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  justify-content: center;
  display: flex;
  margin: 10px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export const TopWrapper = styled.View`
  width: 90%;
  position: absolute;
  top: 70px;
  left: 5%;
  right: 5%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  z-index: 2;
  elevation: 2;
`;
