import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';
import ApplicationShowScreen from '@Screens/dashboard/renter/ApplicationShowScreen';
import LessorIndexScreen from '@Screens/dashboard/landlord/LessorIndexScreen';

import LessorActionScreen from '@Screens/dashboard/landlord/LessorActionScreen';
import SeeApplicantsScreen from '@Screens/dashboard/landlord/SubScreens/SeeApplicantsScreen';
import ShortListApplicantsScreen from '@Screens/dashboard/landlord/ShortListApplicantsScreen';
import SeeProfilesScreen from '@Screens/dashboard/landlord/SubScreens/SeeProfilesScreen';

const Lessor = createNativeStackNavigator();
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
      <Lessor.Screen name="Seeapplicants" component={SeeApplicantsScreen} />
      <Lessor.Screen name="Seeprofiles" component={SeeProfilesScreen} />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
