import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';
import LessorIndexScreen from '@Screens/dashboard/landlord/LessorIndexScreen';
import LessorActionScreen from '@Screens/dashboard/landlord/LessorActionScreen';

const Lessor = createNativeStackNavigator();
const LessorNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      <Lessor.Screen
        name="applicantsOverview"
        component={ApplicantsIndexScreen}
      />
      <Lessor.Screen name="LessorIndex" component={LessorIndexScreen} />
      <Lessor.Screen name="LessorAction" component={LessorActionScreen} />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
