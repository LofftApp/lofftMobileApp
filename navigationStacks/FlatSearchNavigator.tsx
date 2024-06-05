import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from 'screens/dashboard/renter/FlatFindScreen';
import FlatShowScreen from 'screens/dashboard/renter/FlatShowScreen';
import ApplyForFlatScreen from 'screens/dashboard/renter/ApplyForFlatScreen';
import ApplicationShowScreen from 'screens/dashboard/renter/ApplicationShowScreen';
import {SearchStackParamsList} from './types';

const FlatFind = createNativeStackNavigator<SearchStackParamsList>();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListScreen} />
      <FlatFind.Screen name="flatShow" component={FlatShowScreen} />
      <FlatFind.Screen name="applyforflat" component={ApplyForFlatScreen} />
      <FlatFind.Screen
        name="applicationshow"
        component={ApplicationShowScreen}
      />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
