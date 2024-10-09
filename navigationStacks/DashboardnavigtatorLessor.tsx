import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux 🏪
import {useGetUserQuery} from 'reduxFeatures/user/userApi';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Navigator
import LessorNavigator from './LessorNavigator';

// Screens
import UserScreen from 'screens/dashboard/renter/UserScreen';
import AdminScreen from 'screens/admin/adminScreen';
import LessorActionScreen from 'screens/dashboard/landlord/LessorActionScreen';

const Tab = createBottomTabNavigator();
const DashboardNavigatorLessor = () => {
  const {data} = useGetUserQuery();
  const admin = data?.user?.admin;
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
