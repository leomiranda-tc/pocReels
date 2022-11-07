import styled from 'styled-components/native';

import Video from 'react-native-video';

export const VideoContainer = styled(Video)`
  position: absolute;
  background-color: black;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Container = styled.View`
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoadingText = styled.Text`
  color: white;
  font-size: 30px;
`;
