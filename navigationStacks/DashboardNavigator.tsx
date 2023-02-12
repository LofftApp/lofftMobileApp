import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import FavoriteFlatScreen from '@Screens/renterFlatFindScreens/FavoriteFlatScreen';
import AlertsScreen from '@Screens/renterFlatFindScreens/AlertsScreen';
import UserScreen from '@Screens/renterFlatFindScreens/UserScreen';

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
        component={FavoriteFlatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="alerts"
        component={AlertsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
