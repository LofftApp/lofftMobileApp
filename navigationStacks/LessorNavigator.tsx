import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';
import ApplicationShowScreen from '@Screens/dashboard/renter/ApplicationShowScreen';
import LessorIndexScreen from '@Screens/dashboard/landlord/LessorIndexScreen';

// import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';
// import ApplicationShowScreen from '@Screens/applications/ApplicationShowScreen';
// import ApplicationIndexScreen from '@Screens/applications/ApplicationIndexScreen';
// import SeeApplicantsScreen from '@Screens/dashboard/landlord/SeeApplicantsScreen';
/* The above changes are currently kept in uncommented as this has to be resolved once we come together  */


import LessorActionScreen from '@Screens/dashboard/landlord/LessorActionScreen';
import ShortListApplicantsScreen from '@Screens/dashboard/landlord/ShortListApplicantsScreen';
import ChatIndexScreen from '@Screens/chat/ChatIndexScreen';
import LessorAcceptScreen from '@Screens/dashboard/landlord/LessorAcceptScreen';

const Lessor = createNativeStackNavigator();
const LessorNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      {/* <Lessor.Screen
        name="applicantsOverview"
        component={ApplicantsIndexScreen}
      /> Joshes Part*/}
      <Lessor.Screen
        name="ApplicationIndex"
        component={ApplicationIndexScreen}
      />
      <Lessor.Screen name="LessorAction" component={LessorActionScreen} />
      <Lessor.Screen name="applicationshow" component={ApplicationShowScreen} />
      {/* ! This was renamed due to error */}
      <Lessor.Screen name="Seeapplicants" component={SeeApplicantsScreen} />
      <Lessor.Screen name="Seeprofiles" component={ShortListApplicantsScreen} />
      <Lessor.Screen name="Gotochat💭" component={ChatIndexScreen} />
      <Lessor.Screen name="Finalizeit" component={LessorAcceptScreen} />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
