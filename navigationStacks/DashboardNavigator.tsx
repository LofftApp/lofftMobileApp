import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import ApplicationIndexScreen from '@Screens/dashboard/ApplicationIndexScreen';
import UserScreen from '@Screens/dashboard/UserScreen';
import SavedListingsScreen from '@Screens/dashboard/SavedScreens/SavedListingsScreen';
import TempScreen from '@Screens/dashboard/TempScreen';

const Tab = createBottomTabNavigator();
const DashboardNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName = 'settings';
          switch (route.name) {
            case 'search':
              iconName = 'search-sm';
              break;
            case 'favorite':
              iconName = 'heart';
              break;
            case 'alerts':
              iconName = 'bell';
              break;
            case 'user':
              iconName = 'user';
              break;
          }
          return <LofftIcon name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="search"
        component={FlatSearchNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="favorite"
        component={SavedListingsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="alerts"
        component={ApplicationIndexScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Ello"
        component={TempScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
