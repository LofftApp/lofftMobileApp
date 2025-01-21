import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import FavoritesScreen from 'screens/dashboard/tenant/FavoritesScreen';


//Types
import {FavoritesStackParamsList} from './types';

const Favorites = createNativeStackNavigator<FavoritesStackParamsList>();
const FavoritesNavigator = () => {
  return (
    <Favorites.Navigator screenOptions={{headerShown: false}}>
      <Favorites.Screen name="FavoritesScreen" component={FavoritesScreen} />
      {/* <Favorites.Screen name="FlatShowScreen" component={FlatShowScreen} />
      <Favorites.Screen
        name="ApplyForFlatScreen"
        component={ApplyForFlatScreen}
      />
      <Favorites.Screen
        name="ApplicationNavigator"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      /> */}
    </Favorites.Navigator>
  );
};

export default FavoritesNavigator;
