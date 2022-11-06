import React, {useState} from 'react';
import {Text, Alert} from 'react-native';

import {Container, Button, VideoContainer} from './styles';
import RNVideoEditor from 'react-native-video-editor';
import * as ImagePicker from 'react-native-image-picker';
import useFiles from '@src/hooks/useFiles';

export default function Home() {
  const videos = useFiles(state => state.files);
  const setVideos = useFiles(state => state.setFiles);

  const [preview, setPreview] = useState<string>('');

  function showVideosSelected() {
    Alert.alert(videos.length + ' videos selected');
  }

  function mergeVideos() {
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

  function showPicker() {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'video',
        includeBase64: true,
      },
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }
        if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          return;
        }
        if (!response.assets || !response.assets[0].uri) {
          return;
        }

        const firstFile = response.assets[0].uri;

        const uri = firstFile
          .replace('%2540', '%40')
          .replace('%252F', '%2F')
          .replace('file://', '');

        setVideos(uri);
      },
    );
  }

  return (
    <>
      <Container>
        <VideoContainer source={{uri: preview}} controls />
      </Container>

      <Container>
        <Button onPress={showPicker}>
          <Text>Open Gallery</Text>
        </Button>
        <Button onPress={showVideosSelected}>
          <Text>Check videos Selected</Text>
        </Button>
        <Button onPress={mergeVideos}>
          <Text>Merge Videos</Text>
        </Button>
      </Container>
    </>
  );
}
