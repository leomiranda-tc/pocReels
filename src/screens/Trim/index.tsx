import React from 'react';
import Player from '@src/components/Player';

const Trim = ({route}) => {
  const {uri} = route.params;
  return <Player uri={uri} />;
};

export default Trim;
