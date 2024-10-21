import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FlatListSubScreen from 'screens/dashboard/landlord/SubScreens/FlatListSubScreen';
import FlatShowScreen from 'screens/dashboard/tenant/FlatShowScreen';
import ApplyForFlatScreen from 'screens/dashboard/tenant/ApplyForFlatScreen';
import ApplicationNavigator from './ApplicationNavigator';
import {SearchStackParamsList} from './types';

const FlatFind = createNativeStackNavigator<SearchStackParamsList>();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListSubScreen} />
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
