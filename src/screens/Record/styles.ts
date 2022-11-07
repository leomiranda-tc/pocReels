import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  width: 50px;
  border-width: 2px;
  padding: 10px;
  margin: 10px;
  border-color: #fff;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

export const BottomWrapper = styled.View`
  width: 90%;
  position: absolute;
  bottom: 10%;
  left: 5%;
  right: 5%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonRecord = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 100;
  background-color: red;
`;
