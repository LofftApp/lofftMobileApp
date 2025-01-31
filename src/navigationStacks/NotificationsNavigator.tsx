import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';
import ApplicationNavigator from './ApplicationNavigator';
import LessorIndexNavigator from './LessorIndexNavigator';

//Types
import type {NotificationsStackParamsList} from './types';
import ChatroomsNavigator from './ChatroomsNavigator';

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

      <Notification.Screen
        name="ChatroomsNavigator"
        component={ChatroomsNavigator}
        options={{headerShown: false}}
      />
    </Notification.Navigator>
  );
};

export default NotificationsNavigator;
