import styled from 'styled-components/native';
import {PropsRecordButton, PropsTimeline} from './types';
import {Camera} from 'react-native-vision-camera';

export const CameraContainer = styled(Camera)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 20px;
`;

export const BottomWrapper = styled.View`
  width: 90%;
  position: absolute;
  bottom: 70px;
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
  height: 5px;
`;

export const Timeline = styled.View<PropsTimeline>`
  width: ${props => props.width};
  background: red;
  border-left-width: 1px;
  border-color: #ddd;
`;

export const ButtonRecord = styled.TouchableOpacity<PropsRecordButton>`
  width: 70px;
  height: 70px;
  border-radius: ${props => (props.recording ? 10 : 100)}px;
  background-color: red;
`;
