import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Hooks 🪝
import useRefetchNotifications from 'hooks/useRefetchNotifications';

// Components 🪢
import {tabIcons} from '../helpers/tabIcons';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Screens
import AdminScreen from 'screens/admin/adminScreen';
import LessorIndexNavigator from './LessorIndexNavigator';
import NotificationsNavigator from './NotificationsNavigator';
import SettingsNavigator from './SettingsNavigator';

// Types
import {LessorTabParamsList} from './types';

const Tab = createBottomTabNavigator<LessorTabParamsList>();
const LessorNavigator = () => {
  const {data: currentUser} = useGetUserQuery();

  const {data} = useRefetchNotifications();
  const notifications = data?.notifications;

  const unreadNotifications = notifications?.filter(
    notification => !notification.read,
  ).length;

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
        component={NotificationsNavigator}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: Color.Tomato[100]},
          tabBarBadge: unreadNotifications ? unreadNotifications : undefined,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigator}
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
