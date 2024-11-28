import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const useRequestUserPermission = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      // Request permission on iOS
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('iOS Notification permission granted:', authStatus);
      } else {
        console.log('iOS Notification permission denied');
      }
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
      // Request POST_NOTIFICATIONS permission on Android 13+
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android Notification permission granted');
      } else {
        console.log('Android Notification permission denied');
      }
    } else {
      console.log(
        'Notification permissions not required on this Android version',
      );
    }
  };
  useEffect(() => {
    requestUserPermission();
  }, []);
};
