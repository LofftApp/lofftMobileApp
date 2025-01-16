import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';
import { useSelector } from 'react-redux';

// Hooks 🪝
import useRefetchNotifications from 'hooks/useRefetchNotifications';

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
import NotificationsNavigator from './NotificationsNavigator';

//Types
import {TenantTabParamsList} from './types';
import { RootState } from 'reduxCore/store';

const Tab = createBottomTabNavigator<TenantTabParamsList>();

const TenantNavigator = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const {data: currentUser} = useGetUserQuery();
  const admin = currentUser?.admin;
  const {data} = useRefetchNotifications();
  const notifications = data?.notifications;

  const colors = isDarkMode ? Color.Dark : Color.Light;

  const unreadNotifications = notifications?.filter(n => !n.read).length;

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

export default TenantNavigator;
