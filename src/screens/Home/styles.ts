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
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  border-width: 2px;
  padding: 10px;
  margin: 10px;
`;
