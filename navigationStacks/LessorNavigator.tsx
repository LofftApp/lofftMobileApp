import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplicantsIndexScreen from '@Screens/dashboard/landlord/ApplicantsIndexScreen';

const Lessor = createNativeStackNavigator();
const LessorNavigator = () => {
  return (
    <Lessor.Navigator screenOptions={{headerShown: false}}>
      <Lessor.Screen
        name="applicantsOverview"
        component={ApplicantsIndexScreen}
      />
    </Lessor.Navigator>
  );
};

export default LessorNavigator;
