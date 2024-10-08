import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {RootTabParamList} from './types';

// Redux 🏪
import {useAppSelector} from 'reduxCore/hooks';

// Components 🪢
import LofftIcon from 'components/lofftIcons/LofftIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';

// Navigator
import FlatSearchNavigator from './FlatSearchNavigator';

// Screens
import UserScreen from 'screens/dashboard/renter/UserScreen';
import AdminScreen from 'screens/admin/adminScreen';
import TempScreen from 'screens/dashboard/renter/TempScreen';
import ApplicationNavigator from './ApplicationNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabBarIcons = ({
  route,
  color,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  color: string;
}) => {
  let iconName = 'settings';
  switch (route.name) {
    case 'search':
      iconName = 'search-sm';
      break;
    case 'application':
      iconName = 'list';
      break;
    case 'alerts':
      iconName = 'heart';
      break;
    case 'user':
      iconName = 'user';
      break;
    case 'admin':
      iconName = 'gaming-pad';
      break;
  }
  return <LofftIcon name={iconName} size={25} color={color} />;
};

const DashboardNavigator = () => {
  const admin = useAppSelector(state => state.user.user.admin);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => tabBarIcons({route, color}),
        tabBarActiveTintColor: Color.Lavendar[100],
        tabBarInActiveTintColor: Color.Black[30],
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="search"
        component={FlatSearchNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="application"
        component={ApplicationNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ello"
        component={TempScreen}
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

export default DashboardNavigator;
