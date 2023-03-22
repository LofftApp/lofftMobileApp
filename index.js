/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/store/store';
import oldStore from './src/app/store';
import {Provider} from 'react-redux';

export default function Main() {
  return (
    <Provider store={oldStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
