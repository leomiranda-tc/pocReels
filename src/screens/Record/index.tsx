import useFiles from '@src/hooks/useFiles';
import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {Alert} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {
  Button,
  ButtonRecord,
  BottomWrapper,
  ButtonText,
  BottomTimeline,
  CameraContainer,
  Container,
  Timeline,
} from './styles';

import {getPermissions} from './utils';
import {MAX_DURATION_VIDEO} from '@src/constants';

export default function Record({navigation}) {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const [frontCamera, setFrontCamera] = useState(true);
  const [recording, setRecording] = useState(false);
  const setVideos = useFiles(state => state.setFiles);
  const files = useFiles(state => state.files);

  const device = useMemo(
    () => (frontCamera ? devices.front : devices.back),
    [devices, frontCamera],
  );

  const changeCamera = useCallback(() => {
    setFrontCamera(oldState => !oldState);
  }, []);

  const goToNext = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const record = useCallback(() => {
    setRecording(oldState => !oldState);

    if (recording) {
      cameraRef?.current?.stopRecording();
      return;
    }

    cameraRef?.current?.startRecording({
      flash: 'on',
      onRecordingFinished: video => {
        setVideos({
          uri: video.path,
          duration: video.duration,
        });
      },
      onRecordingError: error => Alert.alert(error.message),
    });
  }, [recording, setVideos]);

  const TimelineDuration = useMemo(() => {
    return (
      <BottomTimeline>
        {files.map(file => {
          const percentual = (file.duration / MAX_DURATION_VIDEO) * 100 + '%';
          return <Timeline width={percentual} />;
        })}
      </BottomTimeline>
    );
  }, [files]);

  useEffect(() => {
    getPermissions();
  }, []);

  if (device == null) {
    return <></>;
  }

  return (
    <Container>
      <CameraContainer
        ref={cameraRef}
        device={device}
        video
        audio
        isActive={true}>
        <BottomWrapper>
          <Button onPress={changeCamera}>
            <ButtonText>SW</ButtonText>
          </Button>
          <ButtonRecord onPress={record} recording={recording} />
          <Button>
            <ButtonText onPress={goToNext}> {'>'} </ButtonText>
          </Button>
        </BottomWrapper>
        {TimelineDuration}
      </CameraContainer>
    </Container>
  );
}
