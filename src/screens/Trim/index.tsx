import React, {useCallback, useEffect, useRef, useState} from 'react';
import {WrapperSlide} from './styles';
import {RangeSlider} from '@sharcoux/slider';
import {MAX_DURATION_VIDEO} from '@src/constants';
import {isBiggerThanMax} from './utils';
import {RangeProps} from './types';
import {
  selectClearAll,
  selectFiles,
  selectUpdateFile,
} from '@src/hooks/useFiles/selectors';
import useFiles from '@src/hooks/useFiles';
import {VideoContainer} from '@src/components/Player/styles';
import Video from 'react-native-video';
import {Alert, StyleSheet} from 'react-native';
import {Button, Container, TopWrapper} from '@src/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import {generateNewName, secondToTimeString} from '@src/utils';

let debounceTimer;

const Trim = ({navigation}) => {
  const playerRef = useRef<Video>(null);
  const [file] = useFiles(selectFiles);
  const clearAll = useFiles(selectClearAll);
  const updateFile = useFiles(selectUpdateFile);
  const [rangeTime, setRangeTime] = useState<RangeProps>({
    start: 0,
    end:
      file.duration > MAX_DURATION_VIDEO ? MAX_DURATION_VIDEO : file.duration,
  });

  function onRangeChange(range: [number, number]) {
    setRangeTime(oldValue => {
      if (oldValue.start === range[0] && isBiggerThanMax(range)) {
        return {start: range[1] - MAX_DURATION_VIDEO, end: range[1]};
      }

      if (oldValue.end === range[1] && isBiggerThanMax(range)) {
        return {start: range[0], end: range[0] + MAX_DURATION_VIDEO};
      }

      return {start: range[0], end: range[1]};
    });
  }

  const close = useCallback(() => {
    Alert.alert('Atenção', 'Deseja desistir do conteúdo?', [
      {
        text: 'Sim',
        onPress: navigation.goBack,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }, [navigation.goBack]);

  function onProgressVideo({currentTime}) {
    if (currentTime >= rangeTime.end) {
      playerRef.current?.seek(rangeTime.start);
    }
  }

  function trimVideo() {
    const outputName = generateNewName(file.uri);

    FFmpegKit.execute(
      `-ss ${secondToTimeString(rangeTime.start)} -to ${secondToTimeString(
        rangeTime.end,
      )} -i ${file.uri} -c copy ${outputName}`,
    ).then(async session => {
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        updateFile(0, {
          uri: outputName,
          duration: rangeTime.end - rangeTime.start,
        });
        navigation.navigate('Preview');

        return;
      }

      console.log('ERROR or CANCEL', returnCode);
    });
  }

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, [clearAll]);

  useEffect(() => {
    debounceTimer = setTimeout(() => {
      playerRef.current?.seek(rangeTime.start);
    }, 200);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [rangeTime.start]);

  return (
    <Container>
      <TopWrapper>
        <Button onPress={close}>
          <Icon name="close" size={30} color="#FFF" />
        </Button>
        <Button onPress={trimVideo}>
          <Icon name="right" size={30} color="#FFF" />
        </Button>
      </TopWrapper>

      <VideoContainer
        ref={playerRef}
        source={{uri: file.uri}}
        repeat
        resizeMode="cover"
        onProgress={onProgressVideo}
      />
      <WrapperSlide>
        <RangeSlider
          range={[rangeTime.start, rangeTime.end]}
          onValueChange={onRangeChange}
          minimumValue={0}
          maximumValue={file.duration}
          minimumRange={2}
          outboundColor="#ddd"
          inboundColor="red"
          thumbTintColor="#000"
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
          enabled
          slideOnTap
        />
      </WrapperSlide>
    </Container>
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    borderRadius: 0,
    height: 20,
    width: 5,
  },
  trackStyle: {height: 20},
});

export default Trim;
