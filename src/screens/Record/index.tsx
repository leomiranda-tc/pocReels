import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {Button} from './styles';

export default function Record() {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  async function getPermissions() {
    await Camera.requestCameraPermission();
    await Camera.requestMicrophonePermission();
  }

  if (device == null) {
    return (
      <Button onPress={getPermissions}>
        <Text>Get Permission</Text>
      </Button>
    );
  }

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
