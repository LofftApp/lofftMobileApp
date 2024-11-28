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

import {handleBackgroundNotifications} from 'reduxFeatures/firebaseNotifications/handleBackgroundNotifications';
import {setupAndroidNotificationChannel} from 'reduxFeatures/firebaseNotifications/setupAndroidNotificationChannel';

// Setup Android notification channel
setupAndroidNotificationChannel();

// Background notification handler
handleBackgroundNotifications();

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
