import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicationShowScreen from 'screens/dashboard/renter/ApplicationShowScreen';
import LessorIndexScreen from 'screens/dashboard/landlord/LessorIndexScreen';
import LessorChatScreen from 'screens/dashboard/landlord/LessorChatScreen';

import LessorActionScreen from 'screens/dashboard/landlord/LessorActionScreen';
import SeeApplicantsScreen from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';
import SeeProfilesScreen from 'screens/dashboard/landlord/SubScreens/SeeProfilesScreen';
import ApplicantProfileScreen from 'screens/profile/ApplicantProfileScreen';
import type {LessorNavigatorStackParamsList} from './types';
import SelectionConfirmedScreen from 'screens/dashboard/landlord/SubScreens/SelectionConfirmedScreen';

const Lessor = createNativeStackNavigator<LessorNavigatorStackParamsList>();
const LessorNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      <Lessor.Screen name="LessorIndex" component={LessorIndexScreen} />
      <Lessor.Screen name="LessorAction" component={LessorActionScreen} />
      <Lessor.Screen name="applicationshow" component={ApplicationShowScreen} />
      {/* {Dynamic Status Bar Screen for Landlord Applicaiton Selection Process} */}
      <Lessor.Screen name="seeApplicants" component={SeeApplicantsScreen} />
      <Lessor.Screen name="seeProfiles" component={SeeProfilesScreen} />
      <Lessor.Screen
        name="selectionConfirmed"
        component={SelectionConfirmedScreen}
      />

      {/* Chat etc need to be added */}
      <Lessor.Screen name="chat" component={LessorChatScreen} />

      {/* Chat etc need to be added */}
      <Lessor.Screen
        name="ApplicantProfile"
        component={ApplicantProfileScreen}
      />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
