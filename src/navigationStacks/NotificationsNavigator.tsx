import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import ApplicationShowScreen from 'screens/dashboard/tenant/ApplicationShowScreen';

import type {NotificationsStackParamsList} from './types';
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';
import FlatShowScreen from 'screens/dashboard/tenant/FlatShowScreen';

const Notification = createNativeStackNavigator<NotificationsStackParamsList>();
const NotificationsNavigator = () => {
  return (
    <Notification.Navigator screenOptions={{headerShown: false}}>
      <Notification.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Notification.Screen
        name="ApplicationShowScreen"
        component={ApplicationShowScreen}
      />
      <Notification.Screen name="FlatShowScreen" component={FlatShowScreen} />
    </Notification.Navigator>
  );
};

export default NotificationsNavigator;
