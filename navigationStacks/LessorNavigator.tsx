import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';
import ApplicationShowScreen from '@Screens/dashboard/renter/ApplicationShowScreen';
import LessorIndexScreen from '@Screens/dashboard/landlord/LessorIndexScreen';
import SeeApplicantsScreen from '@Screens/dashboard/landlord/SeeApplicantsScreen';
import LessorActionScreen from '@Screens/dashboard/landlord/LessorActionScreen';
import ShortListApplicantsScreen from '@Screens/dashboard/landlord/ShortListApplicantsScreen';
import ChatScreen from '@Screens/dashboard/landlord/ChatScreen';
import LessorAcceptScreen from '@Screens/dashboard/landlord/LessorAcceptScreen';

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
      <Lessor.Screen name="Seeapplicants" component={ApplicantsIndexScreen} />
      <Lessor.Screen name="Seeprofiles" component={ShortListApplicantsScreen} />
      <Lessor.Screen name="Gotochat💭" component={ChatScreen} />
      <Lessor.Screen name="Finalizeit" component={LessorAcceptScreen} />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
