import React from 'react';
import {Props} from './types';
import {VideoContainer} from './styles';

const Player = ({uri}: Props) => {
  return <VideoContainer source={{uri: uri}} repeat resizeMode="cover" />;
};

export default Player;
