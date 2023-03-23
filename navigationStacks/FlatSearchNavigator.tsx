import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from '@Screens/renterFlatFindScreens/FlatFindScreen';
import FlatShowScreen from '@Screens/renterFlatFindScreens/FlatShowScreen';
import ApplyForFlatScreen from '@Screens/renterFlatFindScreens/ApplyForFlatScreen';
import CompleteProfileScreen from '@Screens/renterFlatFindScreens/CompleteProfileScreen';

const FlatFind = createNativeStackNavigator();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListScreen} />
      <FlatFind.Screen name="flatShow" component={FlatShowScreen} />
      <FlatFind.Screen name="applyforflat" component={ApplyForFlatScreen} />
      <FlatFind.Screen name="completeProfileScreen" component={CompleteProfileScreen} />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
