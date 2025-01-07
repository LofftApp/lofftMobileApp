import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Hooks 🪝
import useRefetchNotifications from 'hooks/useRefetchNotifications';

// Components 🪢
import {tabIcons} from './tabIcons';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPalletTest.json';

// Screens
import AdminScreen from 'screens/admin/adminScreen';
import UserScreen from 'screens/dashboard/tenant/UserScreen';
import LessorIndexNavigator from './LessorIndexNavigator';
import NotificationsNavigator from './NotificationsNavigator';

// Types
import {LessorTabParamsList} from './types';
import { useTheme } from '@react-navigation/native';


const Tab = createBottomTabNavigator<LessorTabParamsList>();
const LessorNavigator = () => {
  const {data: currentUser} = useGetUserQuery();

  const {data} = useRefetchNotifications();
  const {isDarkMode}: any = useTheme();

  const colors = isDarkMode ? Color.Dark : Color.Light;
  const notifications = data?.notifications;

  const unreadNotifications = notifications?.filter(
    notification => !notification.read,
  ).length;

  const admin = currentUser?.admin;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => tabIcons({route, color}),
        tabBarActiveTintColor: colors.Lavendar[100],
        tabBarInActiveTintColor: colors.Black[30],
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.White[100],
        },
      })}>
      <Tab.Screen
        name="LessorIndexNavigator"
        component={LessorIndexNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsNavigator}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: colors.Tomato[100]},
          tabBarBadge: unreadNotifications ? unreadNotifications : undefined,
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
