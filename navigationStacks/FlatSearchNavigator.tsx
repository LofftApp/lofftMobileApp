import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from 'screens/dashboard/renter/FlatFindScreen';
import FlatShowScreen from 'screens/dashboard/renter/FlatShowScreen';
import ApplyForFlatScreen from 'screens/dashboard/renter/ApplyForFlatScreen';
import {SearchStackParamsList} from './types';
import ApplicationNavigator from './ApplicationNavigator';

const FlatFind = createNativeStackNavigator<SearchStackParamsList>();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListScreen} />
      <FlatFind.Screen name="flatShow" component={FlatShowScreen} />
      <FlatFind.Screen name="applyforflat" component={ApplyForFlatScreen} />
      <FlatFind.Screen
        name="applications"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
