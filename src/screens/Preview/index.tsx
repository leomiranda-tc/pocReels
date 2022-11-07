import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {Container, LoadingText, VideoContainer} from './styles';
import RNVideoEditor from 'react-native-video-editor';
import useFiles from '@src/hooks/useFiles';
import {selectFiles} from '@src/hooks/useFiles/selectors';

export default function Preview() {
  const files = useFiles(selectFiles);
  const [preview, setPreview] = useState<string>('');

  const mergeVideos = useCallback(() => {
    if (files.length === 1) {
      setPreview(files[0].uri);
      return;
    }

    const videos = files.map(file => {
      return file.uri;
    });

    RNVideoEditor.merge(
      videos,
      error => {
        Alert.alert('Error: ' + error);
      },
      (_, file) => {
        setPreview(file);
      },
    );
  }, [files]);

  useEffect(() => {
    if (files.length > 0) {
      mergeVideos();
    }
  }, [files, mergeVideos]);

  if (preview === '') {
    return (
      <Container>
        <LoadingText>Loading</LoadingText>
      </Container>
    );
  }

  return <VideoContainer source={{uri: preview}} controls />;
}
