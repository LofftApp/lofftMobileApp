import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import FavoritesScreen from 'screens/dashboard/tenant/FavoritesScreen';


//Types
import {FavoritesStackParamsList} from './types';
import ApplyForFlatScreen from 'screens/dashboard/tenant/ApplyForFlatScreen';

const Favorites = createNativeStackNavigator<FavoritesStackParamsList>();
const FavoritesNavigator = () => {
  return (
    <Favorites.Navigator screenOptions={{headerShown: false}}>
      <Favorites.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Favorites.Screen
        name="ApplyForFlatScreen"
        component={ApplyForFlatScreen}
      />

    </Favorites.Navigator>
  );
};

export default FavoritesNavigator;
