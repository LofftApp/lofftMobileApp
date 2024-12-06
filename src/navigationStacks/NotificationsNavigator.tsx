import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import ApplicationShowScreen from 'screens/dashboard/tenant/ApplicationShowScreen';

import type {NotificationsStackParamsList} from './types';
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';
import FlatShowScreen from 'screens/dashboard/tenant/FlatShowScreen';
import ApplicationNavigator from './ApplicationNavigator';
import LessorNavigator from './LessorNavigator';
import LessorIndexNavigator from './LessorIndexNavigator';

const Notification = createNativeStackNavigator<NotificationsStackParamsList>();
const NotificationsNavigator = () => {
  return (
    <Notification.Navigator screenOptions={{headerShown: false}}>
      <Notification.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Notification.Screen
        name="LessorIndexNavigator"
        component={LessorIndexNavigator}
        options={{headerShown: false}}
      />
        <Notification.Screen
        name="ApplicationNavigator"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      />
    </Notification.Navigator>
  );
};

export default NotificationsNavigator;
