import React, {useState} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';

import {Container, Button} from './styles';
import RNVideoEditor from 'react-native-video-editor';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import useFiles from '@src/hooks/useFiles';
// https://stackoverflow.com/questions/41663002/react-rctbridgemodule-h-file-not-found

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
        if (!response.assets) {
          return;
        }
        if (!response.assets[0].uri) {
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
        <Video
          source={{uri: preview}}
          style={styles.backgroundVideo}
          controls
        />
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

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    backgroundColor: 'black',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
