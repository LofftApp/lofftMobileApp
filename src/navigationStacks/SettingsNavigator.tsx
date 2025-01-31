import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import SettingsScreen from 'screens/profile/SettingsScreen';

//Types
import type {SettingsStackParamsList} from './types';

const Settings = createNativeStackNavigator<SettingsStackParamsList>();
const SettingsNavigator = () => {
  return (
    <Settings.Navigator screenOptions={{headerShown: false}}>
      <Settings.Screen name="SettingsScreen" component={SettingsScreen} />
    </Settings.Navigator>
  );
};

export default SettingsNavigator;
