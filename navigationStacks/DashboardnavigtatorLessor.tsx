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
import UserScreen from 'screens/dashboard/renter/UserScreen';
import AdminScreen from 'screens/admin/adminScreen';
// import LessorIndexScreen from 'screens/dashboard/landlord/LessorIndexScreen';
import LessorActionScreen from 'screens/dashboard/landlord/LessorActionScreen';

const Tab = createBottomTabNavigator();
const DashboardNavigatorLessor = () => {
  const admin = useAppSelector(state => state.user.user.admin);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => tabIcons(route.name, color),
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="lessorIndex"
        component={LessorNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="lessorAction"
        component={LessorActionScreen}
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

export default DashboardNavigatorLessor;
