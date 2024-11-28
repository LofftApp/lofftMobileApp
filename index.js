/**
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {persister} from 'persistance/persister';
import {setupStore} from 'reduxCore/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function setupNotificationChannel() {
  try {
    await notifee.createChannel({
      id: 'default', // Channel ID
      name: 'Default Channel', // Channel name visible to users
      importance: notifee.AndroidImportance.HIGH, // Set importance
    });
    console.log('Android notification channel created');
  } catch (error) {
    console.error('Error creating notification channel:', error);
  }
}

// Background notification handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message received:', remoteMessage);

  const body = remoteMessage.notification?.body;
  const title = remoteMessage.notification?.title;

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default', // Ensure this matches the channel ID
    },
  });
});

setupNotificationChannel();

export default function Main() {
  return (
    <Provider store={setupStore()}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
