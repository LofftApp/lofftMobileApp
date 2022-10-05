/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/app/store';
import {Provider} from 'react-redux';

export default function Main() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
