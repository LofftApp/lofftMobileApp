import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from '@Screens/adverts/AdvertIndexScreen';
import AdvertShowScreen from '@Screens/adverts/AdvertShowScreen';
import ApplyForFlatScreen from '@Screens/applications/ApplyForFlatScreen';
import ApplicationShowScreen from '@Screens/applications/ApplicationShowScreen';

const FlatFind = createNativeStackNavigator();
const FlatSearchNavigator = () => {
  return (
    <FlatFind.Navigator screenOptions={{headerShown: false}}>
      <FlatFind.Screen name="flatOverview" component={FlatListScreen} />
      <FlatFind.Screen name="flatShow" component={AdvertShowScreen} />
      <FlatFind.Screen name="applyforflat" component={ApplyForFlatScreen} />
      <FlatFind.Screen
        name="applicationshow"
        component={ApplicationShowScreen}
      />
    </FlatFind.Navigator>
  );
};

export default FlatSearchNavigator;
