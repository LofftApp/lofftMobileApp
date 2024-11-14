import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import {tabIcons} from './tabIcons';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Navigator
// import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import AdminScreen from 'screens/admin/adminScreen';
// import LessorIndexScreen from 'screens/dashboard/landlord/LessorIndexScreen';
import LessorNotificationScreen from 'screens/dashboard/landlord/LessorNotificationScreen';
import {LessorTabParamsList} from './types';
import UserScreen from 'screens/dashboard/tenant/UserScreen';
import LessorIndexNavigator from './LessorIndexNavigator';

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
        name="lessorIndex"
        component={LessorIndexNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="lessorAction"
        component={LessorNotificationScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{headerShown: false}}
      />
      {admin ? (
        <Tab.Screen
          name="admin"
          component={AdminScreen}
          options={{headerShown: false}}
        />
      ) : null}
    </Tab.Navigator>
  );
};

export default LessorNavigator;
