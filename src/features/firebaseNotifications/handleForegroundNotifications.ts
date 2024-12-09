import notifee from '@notifee/react-native';

export const handleForegroundNotifications = async (remoteMessage: any) => {
  console.log('Foreground message received:', remoteMessage);

  const body = remoteMessage.notification?.body;
  const title = remoteMessage.notification?.title;

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
    },
  });
};
