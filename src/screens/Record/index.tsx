import useFiles from '@src/hooks/useFiles';
import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {Alert} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Button,
  ButtonRecord,
  BottomWrapper,
  BottomTimeline,
  CameraContainer,
  Container,
  Timeline,
  TopWrapper,
} from './styles';

import {getPermissions} from './utils';
import {PROGRESS_TIME_MILLISECONDS, PROGRESS_TIME_SECONDS} from './constants';
import {MAX_DURATION_VIDEO} from '@src/constants';
import {
  selectClearAll,
  selectFiles,
  selectSetFile,
  selectTotalDuration,
} from '@src/hooks/useFiles/selectors';

let counterDurationRecording;

export default function Record({navigation}) {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const [frontCamera, setFrontCamera] = useState(true);
  const [recording, setRecording] = useState(false);
  const [durationRecording, setDurationRecording] = useState(0);
  const setVideos = useFiles(selectSetFile);
  const files = useFiles(selectFiles);
  const totalDuration = useFiles(selectTotalDuration);
  const clearAll = useFiles(selectClearAll);

  const device = useMemo(
    () => (frontCamera ? devices.front : devices.back),
    [devices, frontCamera],
  );

  const changeCamera = useCallback(() => {
    setFrontCamera(oldState => !oldState);
  }, []);

  const close = useCallback(() => {
    clearAll();
  }, [clearAll]);

  const goToNext = useCallback(() => {
    navigation.navigate('Preview');
  }, [navigation]);

  function stopRecord() {
    setRecording(false);
    setDurationRecording(0);
    clearInterval(counterDurationRecording);

    cameraRef?.current?.stopRecording();
  }

  const countDurationRecording = useCallback(
    (old: number): number => {
      if (totalDuration + old + PROGRESS_TIME_SECONDS >= MAX_DURATION_VIDEO) {
        stopRecord();
      }

      return old + PROGRESS_TIME_SECONDS;
    },
    [totalDuration],
  );

  const record = useCallback(() => {
    if (recording) {
      stopRecord();
      return;
    }

    setRecording(true);

    counterDurationRecording = setInterval(() => {
      setDurationRecording(countDurationRecording);
    }, PROGRESS_TIME_MILLISECONDS);

    cameraRef?.current?.startRecording({
      flash: 'off',
      onRecordingFinished: video => {
        setVideos({
          uri: video.path,
          duration: video.duration,
        });
      },
      onRecordingError: error => Alert.alert(error.message),
    });
  }, [countDurationRecording, recording, setVideos]);

  const TimelineDuration = useMemo(() => {
    return (
      <BottomTimeline>
        {files.map(file => {
          const percentual = (file.duration / MAX_DURATION_VIDEO) * 100 + '%';
          return <Timeline key={file.uri} width={percentual} />;
        })}
        <Timeline
          key="recording"
          width={(durationRecording / MAX_DURATION_VIDEO) * 100 + '%'}
        />
      </BottomTimeline>
    );
  }, [durationRecording, files]);

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
        <TopWrapper>
          <Button onPress={close}>
            <Icon name="close" size={30} color="#FFF" />
          </Button>
        </TopWrapper>

        <BottomWrapper>
          <Button onPress={changeCamera}>
            <Icon name="retweet" size={30} color="#FFF" />
          </Button>
          <ButtonRecord onPress={record} recording={recording} />
          <Button onPress={goToNext}>
            <Icon name="right" size={30} color="#FFF" />
          </Button>
        </BottomWrapper>

        {TimelineDuration}
      </CameraContainer>
    </Container>
  );
}
