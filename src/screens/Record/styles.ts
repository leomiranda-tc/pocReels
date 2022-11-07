import styled from 'styled-components/native';
import {PropsRecordButton, PropsTimeline} from './types';
import {Camera} from 'react-native-vision-camera';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export const CameraContainer = styled(Camera)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 20px;
`;

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

export const BottomTimeline = styled.View`
  width: 100%;
  background: #ddd;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 10px;
`;

export const Timeline = styled.View<PropsTimeline>`
  width: ${props => props.width};
  background: red;
  border: 1px solid #ddd;
`;

export const ButtonRecord = styled.TouchableOpacity<PropsRecordButton>`
  width: 70px;
  height: 70px;
  border-radius: ${props => (props.recording ? 10 : 100)};
  background-color: red;
`;
