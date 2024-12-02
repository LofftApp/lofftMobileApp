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
import NotificationsScreen from 'screens/dashboard/NotificationsScreen';

// Types
import {LessorTabParamsList} from './types';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';

const Tab = createBottomTabNavigator<LessorTabParamsList>();
const LessorNavigator = () => {
  const {data: currentUser} = useGetUserQuery();
  const {data} = useGetNotificationsQuery();
  const unreadNotifications = data?.notifications?.filter(
    notification => !notification.read,
  ).length;
  console.log('unreadNotifications', unreadNotifications);
  console.log('notifications', data?.notifications);
  const admin = currentUser?.admin;
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
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: Color.Tomato[100]},
          tabBarBadge: unreadNotifications && unreadNotifications,
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

export default LessorNavigator;
