import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplyForFlatScreen from 'screens/dashboard/renter/ApplyForFlatScreen';
import ApplicationShowScreen from 'screens/dashboard/renter/ApplicationShowScreen';
import {ApplicationStackParamsList} from './types';
import LessorChatScreen from 'screens/dashboard/landlord/LessorChatScreen';
import ApplicationIndexScreen from 'screens/dashboard/renter/ApplicationIndexScreen';

const Apply = createNativeStackNavigator<ApplicationStackParamsList>();
const ApplicationNavigator = () => {
  return (
    <Apply.Navigator screenOptions={{headerShown: false}}>
      <Apply.Screen
        name="applicationsList"
        component={ApplicationIndexScreen}
      />
      <Apply.Screen name="applicationshow" component={ApplicationShowScreen} />
      <Apply.Screen name="chat" component={LessorChatScreen} />
    </Apply.Navigator>
  );
};

export default ApplicationNavigator;
