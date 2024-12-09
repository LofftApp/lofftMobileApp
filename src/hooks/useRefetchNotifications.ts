import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';

const useRefetchNotifications = () => {
  const {refetch, data} = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // Listen for app state changes (from background to foreground)
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App is active. Refetching notifications...');
        refetch();
      }
    };

    const unsubscribeAppState = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Refetch on foreground FCM messages
    const unsubscribeFCM = messaging().onMessage(() => {
      console.log('Foreground message received. Refetching notifications...');
      refetch();
    });

    return () => {
      unsubscribeAppState.remove();
      unsubscribeFCM();
    };
  }, [refetch]);
  return {data};
};

export default useRefetchNotifications;
