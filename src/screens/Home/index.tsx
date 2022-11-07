import React, {useState} from 'react';
import {Text, Alert} from 'react-native';

import {Container, Button, VideoContainer} from './styles';
import RNVideoEditor from 'react-native-video-editor';
import useFiles from '@src/hooks/useFiles';

export default function Home() {
  const files = useFiles(state => state.files);

  const [preview, setPreview] = useState<string>('');

  function showVideosSelected() {
    Alert.alert(files.length + ' files selected');
  }

  function mergeVideos() {
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
  }

  return (
    <>
      <Container>
        <VideoContainer source={{uri: preview}} controls />
      </Container>

      <Container>
        <Button onPress={showVideosSelected}>
          <Text>Check files Selected</Text>
        </Button>
        <Button onPress={mergeVideos}>
          <Text>Merge Videos</Text>
        </Button>
      </Container>
    </>
  );
}
