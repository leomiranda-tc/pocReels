import {Camera} from 'react-native-vision-camera';

export async function getPermissions() {
  await Camera.requestCameraPermission();
  await Camera.requestMicrophonePermission();
}
