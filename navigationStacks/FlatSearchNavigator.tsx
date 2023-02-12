import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from '@Screens/renterFlatFindScreens/FlatFindScreen';
import FlatProfileScreen from '@Screens/renterFlatFindScreens/FlatProfileScreen';

const FlatFind = createNativeStackNavigator();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListScreen} />
      <FlatFind.Screen name="flatProfile" component={FlatProfileScreen} />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
