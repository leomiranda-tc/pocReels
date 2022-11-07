import React from 'react';
import {StyleSheet} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';

export default function Record() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  if (device == null) {
    return <></>;
  }

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
