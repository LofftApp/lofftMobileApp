import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LessorChatScreen from 'screens/dashboard/landlord/LessorChatScreen';
import ApplicationsIndexScreen from 'screens/dashboard/tenant/ApplicationsIndexScreen';
import ApplicationShowScreen from 'screens/dashboard/tenant/ApplicationShowScreen';

import {ApplicationStackParamsList} from './types';

const Apply = createNativeStackNavigator<ApplicationStackParamsList>();
const ApplicationNavigator = () => {
  return (
    <Apply.Navigator screenOptions={{headerShown: false}}>
      <Apply.Screen
        name="ApplicationsIndexScreen"
        component={ApplicationsIndexScreen}
      />
      <Apply.Screen
        name="ApplicationShowScreen"
        component={ApplicationShowScreen}
      />
      <Apply.Screen name="LessorChatScreen" component={LessorChatScreen} />
    </Apply.Navigator>
  );
};

export default ApplicationNavigator;
