import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import FlatFindScreen from 'screens/dashboard/tenant/FlatFindScreen';
import FlatShowScreen from 'screens/dashboard/tenant/FlatShowScreen';
import ApplyForFlatScreen from 'screens/dashboard/tenant/ApplyForFlatScreen';
import ApplicationNavigator from './ApplicationNavigator';

//Types
import {SearchStackParamsList} from './types';

const FlatFind = createNativeStackNavigator<SearchStackParamsList>();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="FlatFindScreen" component={FlatFindScreen} />
      <FlatFind.Screen name="FlatShowScreen" component={FlatShowScreen} />
      <FlatFind.Screen
        name="ApplyForFlatScreen"
        component={ApplyForFlatScreen}
      />
      <FlatFind.Screen
        name="ApplicationNavigator"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
