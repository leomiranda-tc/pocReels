import React, {useEffect, useRef, useState} from 'react';
import {WrapperSlide} from './styles';
import {RangeSlider} from '@sharcoux/slider';
import {MAX_DURATION_VIDEO} from '@src/constants';
import {isBiggerThanMax} from './utils';
import {RangeProps} from './types';
import {selectClearAll, selectFiles} from '@src/hooks/useFiles/selectors';
import useFiles from '@src/hooks/useFiles';
import {VideoContainer} from '@src/components/Player/styles';
import Video from 'react-native-video';
import {StyleSheet} from 'react-native';

let debounceTimer;

const Trim = () => {
  const playerRef = useRef<Video>(null);
  const [file] = useFiles(selectFiles);
  const clearAll = useFiles(selectClearAll);
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

  function onProgressVideo({currentTime}) {
    if (currentTime >= rangeTime.end) {
      playerRef.current?.seek(rangeTime.start);
    }
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
    <>
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
          minimumRange={5}
          outboundColor="#ddd"
          inboundColor="red"
          thumbTintColor="#000"
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
          enabled
          slideOnTap
        />
      </WrapperSlide>
    </>
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
