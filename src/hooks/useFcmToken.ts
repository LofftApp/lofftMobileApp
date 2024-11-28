import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useRegisterTokenMutation} from 'reduxFeatures/firebaseNotifications/fcmApi';
import { Platform } from 'react-native';

const useFCMToken = () => {
  const [registerToken] = useRegisterTokenMutation();

  useEffect(() => {
    const registerDeviceToken = async () => {
      try {
        // Register the device with FCM
        if (Platform.OS === 'android') {
          await messaging().registerDeviceForRemoteMessages();
          console.log('Registered for remote messages on Android');
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

    const handleTokenRefresh = async (newToken: string) => {
      try {
        console.log('FCM Token refreshed:', newToken);

        // Update the backend with the new token using RTK Query
        await registerToken(newToken).unwrap();
        console.log('Token FCM successfully updated');
      } catch (error) {
        console.error('Error refreshing FCM token:', error);
      }
    };

    // Register token on app start
    registerDeviceToken();

    // Listen for token refreshes
    const unsubscribe = messaging().onTokenRefresh(handleTokenRefresh);

    return () => unsubscribe(); // Cleanup
  }, [registerToken]);
};

export default useFCMToken;
