import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TenantTabParamsList} from './types';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import {tabIcons} from './tabIcons';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import AdminScreen from 'screens/admin/adminScreen';
import ApplicationNavigator from './ApplicationNavigator';
import UserScreen from 'screens/dashboard/tenant/UserScreen';
import FavoritesScreen from 'screens/dashboard/tenant/FavoritesScreen';
import AlertsScreen from 'screens/dashboard/tenant/AlertsScreen';

const Tab = createBottomTabNavigator<TenantTabParamsList>();

const TenantNavigator = () => {
  const {data} = useGetUserQuery();
  const admin = data?.admin;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => tabIcons({route, color}),
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="SearchTab"
        component={FlatSearchNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ApplicationsTab"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsScreen}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: Color.Tomato[100]},
          tabBarBadge: '',
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserScreen}
        options={{headerShown: false}}
      />

      {admin ? (
        <Tab.Screen
          name="AdminTab"
          component={AdminScreen}
          options={{headerShown: false}}
        />
      ) : null}
    </Tab.Navigator>
  );
};

export default TenantNavigator;
