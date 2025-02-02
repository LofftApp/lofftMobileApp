import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import ApplicationShowScreen from 'screens/dashboard/tenant/ApplicationShowScreen';
import LessorIndexScreen from 'screens/dashboard/landlord/LessorIndexScreen';
import LessorChatScreen from 'screens/dashboard/landlord/LessorChatScreen';
import SeeApplicantsScreen from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';
import SeeProfilesScreen from 'screens/dashboard/landlord/SubScreens/SeeProfilesScreen';
import ApplicantProfileScreen from 'screens/profile/ApplicantProfileScreen';
import SelectionConfirmedScreen from 'screens/dashboard/landlord/SubScreens/SelectionConfirmedScreen';

import type {LessorNavigatorStackParamsList} from './types';
import ChatroomsNavigator from './ChatroomsNavigator';
import EditAdvertScreen from 'screens/profile/EditAdvertScreen';
import SettingsNavigator from './SettingsNavigator';

const Lessor = createNativeStackNavigator<LessorNavigatorStackParamsList>();
const LessorIndexNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      <Lessor.Screen name="ListingsScreen" component={LessorIndexScreen} />
      <Lessor.Screen
        name="ApplicationShowScreen"
        component={ApplicationShowScreen}
      />
      <Lessor.Screen
        name="SeeApplicantsScreen"
        component={SeeApplicantsScreen}
      />
      <Lessor.Screen name="SeeProfilesScreen" component={SeeProfilesScreen} />
      <Lessor.Screen
        name="SelectionConfirmedScreen"
        component={SelectionConfirmedScreen}
      />
      <Lessor.Screen
        name="ChatroomsNavigator"
        component={ChatroomsNavigator}
        options={{headerShown: false}}
      />
      <Lessor.Screen name="LessorChatScreen" component={LessorChatScreen} />

      <Lessor.Screen
        name="ApplicantProfileScreen"
        component={ApplicantProfileScreen}
      />

      <Lessor.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        screenOptions={{headerShown: false}}
      />
    </Lessor.Navigator>
  );
};

export default LessorIndexNavigator;
