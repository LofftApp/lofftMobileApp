import messaging from '@react-native-firebase/messaging';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';
import {Platform} from 'react-native';

export type RegisterTokenType = MutationTrigger<
  MutationDefinition<string, any, any, {message: string}, 'lofftApi'>
>;
export const registerDeviceToken = async (registerToken: RegisterTokenType) => {
  try {
    // Register the device with FCM (Android only)
    if (Platform.OS === 'android') {
      await messaging().registerDeviceForRemoteMessages();
    }

    // Get the FCM token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    // Register the token using RTK Query
    await registerToken(token).unwrap();
    console.log('Token FCM successfully registered');
  } catch (error) {
    console.error('Error registering FCM token:', error);
  }
};
