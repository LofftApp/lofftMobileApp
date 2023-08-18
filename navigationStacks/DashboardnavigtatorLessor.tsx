import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useAppSelector} from '@ReduxCore/hooks';

// Components 🪢
import LofftIcon from '@Components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from '@StyleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens

import UserScreen from '@Screens/dashboard/renter/UserScreen';
import AdminScreen from '@Screens/admin/adminScreen';
import LessorIndexScreen from '@Screens/dashboard/landlord/LessorIndexScreen';
import LessorActionScreen from '@Screens/dashboard/landlord/LessorActionScreen';
import LessorNavigator from './LessorNavigator';

const Tab = createBottomTabNavigator();
const DashboardNavigatorLessor = () => {
  const admin = useAppSelector(state => state.user.admin);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName = 'settings';
          switch (route.name) {
            case 'lessorIndex':
              iconName = 'list';
              break;
            case 'lessorAction':
              iconName = 'bell';
              break;
            case 'user':
              iconName = 'user';
              break;
            case 'admin':
              iconName = 'gaming-pad';
              break;
          }
          return <LofftIcon name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="lessorIndex"
        component={LessorIndexScreen}
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
