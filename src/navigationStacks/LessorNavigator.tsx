import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import {tabIcons} from './tabIcons';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Screens
import AdminScreen from 'screens/admin/adminScreen';
import UserScreen from 'screens/dashboard/tenant/UserScreen';
import LessorIndexNavigator from './LessorIndexNavigator';
import AlertsScreen from 'screens/dashboard/tenant/AlertsScreen';

// Types
import {LessorTabParamsList} from './types';

const Tab = createBottomTabNavigator<LessorTabParamsList>();
const LessorNavigator = () => {
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
        name="LessorIndexNavigator"
        component={LessorIndexNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsScreen}
        options={{headerShown: false}}
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

export default LessorNavigator;
