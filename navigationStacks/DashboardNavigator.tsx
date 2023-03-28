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
import ApplicationIndexScreen from '@Screens/dashboard/ApplicationIndexScreen';
import UserScreen from '@Screens/dashboard/UserScreen';
import SavedListingsScreen from '@Screens/dashboard/SavedScreens/SavedListingsScreen';
import AdminScreen from '@Screens/admin/adminScreen';
import TempScreen from '@Screens/dashboard/TempScreen';

const Tab = createBottomTabNavigator();
const DashboardNavigator = () => {
  const userType = useAppSelector(state => state.user.userType);
  console.log('userType', userType);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName = 'settings';
          switch (route.name) {
            case 'search':
              iconName = 'search-sm';
              break;
            case 'favorite':
              iconName = 'heart';
              break;
            case 'alerts':
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
        name="search"
        component={FlatSearchNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="favorite"
        component={SavedListingsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="alerts"
        component={ApplicationIndexScreen}
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
      {userType === 'admin' ? (
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
