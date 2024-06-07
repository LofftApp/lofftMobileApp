import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicantsIndexScreen from 'screens/dashboard/landlord/ApplicantsIndexScreen';
import ApplicationShowScreen from 'screens/dashboard/renter/ApplicationShowScreen';
import LessorIndexScreen from 'screens/dashboard/landlord/LessorIndexScreen';

import LessorActionScreen from 'screens/dashboard/landlord/LessorActionScreen';
import SeeApplicantsScreen from 'screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';
import ShortListApplicantsScreen from 'screens/dashboard/landlord/ShortListApplicantsScreen';
import SeeProfilesScreen from 'screens/dashboard/landlord/SubScreens/SeeProfilesScreen';
import ApplicantProfileScreen from 'screens/profile/ApplicantProfileScreen';
import {LessorStackParamsList} from './types';

const Lessor = createNativeStackNavigator<LessorStackParamsList>();
const LessorNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      {/* <Lessor.Screen
        name="applicantsOverview"
        component={ApplicantsIndexScreen}
      /> Joshes Part*/}
      <Lessor.Screen name="LessorIndex" component={LessorIndexScreen} />
      <Lessor.Screen name="LessorAction" component={LessorActionScreen} />
      <Lessor.Screen name="applicationshow" component={ApplicationShowScreen} />

      {/* {Dynamic Status Bar Screen for Landlord Applicaiton Selection Process} */}
      <Lessor.Screen name="allApplicants" component={SeeApplicantsScreen} />
      <Lessor.Screen name="shortlist" component={SeeProfilesScreen} />
      {/* Chat etc need to be added */}
      <Lessor.Screen
        name="ApplicantProfile"
        component={ApplicantProfileScreen}
      />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
