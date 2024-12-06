import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';

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
import NotificationsNavigator from './NotificationsNavigator';

//Types
import {TenantTabParamsList} from './types';
import {useGetNotificationsQuery} from 'reduxFeatures/firebaseNotifications/fcmApi';

const Tab = createBottomTabNavigator<TenantTabParamsList>();

const TenantNavigator = () => {
  const {data: currentUser} = useGetUserQuery();
  const admin = currentUser?.admin;
  const {data, refetch} = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const notifications = data?.notifications;
  // console.log(' total notifications in tenant', notifications?.length);
  // console.log('notifications in tenant', notifications);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(() => {
      refetch();
    });
    return () => unsubscribe();
  }, [refetch]);

  const unreadNotifications = notifications?.filter(n => !n.read).length;
  console.log('unreadNotifications in tenant', unreadNotifications);
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
        name="NotificationsTab"
        component={NotificationsNavigator}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: Color.Tomato[100]},
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
