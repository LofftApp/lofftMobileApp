import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicationsIndexScreen from 'screens/dashboard/tenant/ApplicationsIndexScreen';
import ApplicationShowScreen from 'screens/dashboard/tenant/ApplicationShowScreen';
import ChatroomsNavigator from './ChatroomsNavigator';

import {ApplicationStackParamsList} from './types';
import ChatShowScreen from 'screens/dashboard/ChatShowScreen';

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
      <Apply.Screen
        name="ChatroomsNavigator"
        component={ChatroomsNavigator}
        options={{headerShown: false}}
      />
      <Apply.Screen name="ChatShow" component={ChatShowScreen} />
    </Apply.Navigator>
  );
};

export default ApplicationNavigator;
